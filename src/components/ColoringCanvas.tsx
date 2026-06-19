"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  floodFill,
  type FillStyle,
  type FloodFillHandle,
  type Rgb,
} from "@/lib/floodfill"
import { hslToRgb, type Hsl } from "@/lib/colors"
import { useLocale } from "@/lib/i18n"
import { sound } from "@/lib/sound"
import { UI } from "@/lib/strings"

const CANVAS_SIZE = 1024
const UNDO_LIMIT = 15
const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5
const FILL_ANIMATE_MS = 180

export type FillMode = "solid" | "linear" | "radial"

export type ColoringCanvasHandle = {
  reset: () => void
  undo: () => void
  canUndo: () => boolean
  toDataURL: () => string | null
  getCanvas: () => HTMLCanvasElement | null
}

type Props = {
  imageSrc: string
  fillColor: Hsl
  fillMode: FillMode
  onError?: (msg: string) => void
  onHistoryChange?: (canUndo: boolean) => void
}

function buildStyle(color: Hsl, mode: FillMode): FillStyle {
  const base = hslToRgb(color) as Rgb
  if (mode === "solid") return { kind: "solid", color: base }
  const lighter = hslToRgb({
    h: color.h,
    s: color.s,
    l: Math.min(95, color.l + 22),
  }) as Rgb
  const darker = hslToRgb({
    h: color.h,
    s: color.s,
    l: Math.max(12, color.l - 18),
  }) as Rgb
  if (mode === "linear") return { kind: "linear", from: lighter, to: darker }
  return { kind: "radial", center: lighter, edge: darker }
}

const TYPING_INPUT_TYPES = new Set([
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "number",
])

function isTypingTarget(el: EventTarget | null): boolean {
  const t = el as HTMLElement | null
  if (!t) return false
  if (t.tagName === "TEXTAREA") return true
  if (t.isContentEditable) return true
  if (t.tagName === "INPUT") {
    const type = (t as HTMLInputElement).type
    return TYPING_INPUT_TYPES.has(type)
  }
  return false
}

export const ColoringCanvas = forwardRef<ColoringCanvasHandle, Props>(
  function ColoringCanvas(
    { imageSrc, fillColor, fillMode, onError, onHistoryChange },
    ref,
  ) {
    const { t } = useLocale()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)
    const loadedSrcRef = useRef<string | null>(null)
    const undoStackRef = useRef<ImageData[]>([])
    const activeFillRef = useRef<{
      handle: FloodFillHandle
      snapshot: ImageData
    } | null>(null)
    const dragStartRef = useRef<{
      x: number
      y: number
      sl: number
      st: number
      moved: boolean
    } | null>(null)
    const pinchRef = useRef<{
      initialDistance: number
      initialZoom: number
      initialMidX: number
      initialMidY: number
      initialScrollLeft: number
      initialScrollTop: number
    } | null>(null)
    const recentPinchEndRef = useRef<number>(0)

    const [zoom, setZoom] = useState(1)
    const [spaceHeld, setSpaceHeld] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hasHistory, setHasHistory] = useState(false)

    const notifyHistory = useCallback(() => {
      const has = undoStackRef.current.length > 0
      setHasHistory(has)
      onHistoryChange?.(has)
    }, [onHistoryChange])

    const drawBaseImage = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      const img = imageRef.current
      if (img && img.complete && img.naturalWidth > 0) {
        const scale = Math.min(
          CANVAS_SIZE / img.naturalWidth,
          CANVAS_SIZE / img.naturalHeight,
        )
        const w = img.naturalWidth * scale
        const h = img.naturalHeight * scale
        ctx.drawImage(
          img,
          (CANVAS_SIZE - w) / 2,
          (CANVAS_SIZE - h) / 2,
          w,
          h,
        )
      } else {
        ctx.fillStyle = "#9ca3af"
        ctx.font = "28px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(t(UI.noPng1), CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20)
        ctx.font = "16px system-ui, sans-serif"
        ctx.fillText(t(UI.noPng2), CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20)
      }
      undoStackRef.current = []
      notifyHistory()
    }, [notifyHistory])

    const undo = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return
      // If a fill is currently animating, cancel it and revert to pre-fill state.
      if (activeFillRef.current) {
        const { handle, snapshot } = activeFillRef.current
        handle.cancel()
        ctx.putImageData(snapshot, 0, 0)
        activeFillRef.current = null
        return
      }
      const snap = undoStackRef.current.pop()
      if (!snap) return
      ctx.putImageData(snap, 0, 0)
      notifyHistory()
    }, [notifyHistory])

    const zoomBy = useCallback((delta: number) => {
      setZoom((z) => {
        const next = Math.round((z + delta) * 10) / 10
        return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next))
      })
    }, [])

    const resetZoom = useCallback(() => setZoom(1), [])

    const toggleFullscreen = useCallback(async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
        } else {
          await document.documentElement.requestFullscreen()
        }
      } catch {
        // ignore
      }
    }, [])

    useImperativeHandle(ref, () => ({
      reset: () => drawBaseImage(),
      undo,
      canUndo: () => undoStackRef.current.length > 0,
      toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? null,
      getCanvas: () => canvasRef.current,
    }))

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = CANVAS_SIZE
      canvas.height = CANVAS_SIZE

      if (loadedSrcRef.current === imageSrc && imageRef.current?.complete) {
        drawBaseImage()
        return
      }

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        imageRef.current = img
        loadedSrcRef.current = imageSrc
        drawBaseImage()
      }
      img.onerror = () => {
        imageRef.current = null
        loadedSrcRef.current = imageSrc
        drawBaseImage()
      }
      img.src = imageSrc
    }, [imageSrc, drawBaseImage])

    useEffect(() => {
      function onChange() {
        setIsFullscreen(!!document.fullscreenElement)
      }
      document.addEventListener("fullscreenchange", onChange)
      return () => document.removeEventListener("fullscreenchange", onChange)
    }, [])

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (isTypingTarget(e.target)) return
        const meta = e.ctrlKey || e.metaKey
        if (meta && !e.shiftKey && e.key.toLowerCase() === "z") {
          e.preventDefault()
          undo()
          return
        }
        if (e.shiftKey && (e.key === "+" || e.key === "=")) {
          e.preventDefault()
          zoomBy(ZOOM_STEP)
          return
        }
        if (e.shiftKey && (e.key === "-" || e.key === "_")) {
          e.preventDefault()
          zoomBy(-ZOOM_STEP)
          return
        }
        if (e.shiftKey && e.key === "0") {
          e.preventDefault()
          resetZoom()
          return
        }
        if ((e.key === "f" || e.key === "F") && !meta) {
          e.preventDefault()
          toggleFullscreen()
          return
        }
        if (e.code === "Space") {
          e.preventDefault()
          if (!e.repeat) setSpaceHeld(true)
          return
        }
      }
      function handleKeyUp(e: KeyboardEvent) {
        if (e.code === "Space") {
          setSpaceHeld(false)
          setDragging(false)
          dragStartRef.current = null
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }, [undo, zoomBy, resetZoom, toggleFullscreen])

    function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
      if (spaceHeld) return
      if (dragStartRef.current?.moved) return
      // Suppress synthetic click that may fire after a multi-touch gesture
      if (performance.now() - recentPinchEndRef.current < 350) return
      // Block new fills while one is animating (avoids overlapping putImageData races)
      if (activeFillRef.current) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE
      const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE
      const style = buildStyle(fillColor, fillMode)

      const snapshot = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      let leaked = false
      const handle = floodFill(ctx, CANVAS_SIZE, CANVAS_SIZE, x, y, style, {
        animateMs: FILL_ANIMATE_MS,
        onLeak: () => {
          leaked = true
        },
      })
      if (!handle) {
        if (onError) onError(t(leaked ? UI.fillLeakHint : UI.fillFailHint))
        return
      }
      activeFillRef.current = { handle, snapshot }
      handle.done.then((status) => {
        // Only commit to undo stack if the animation ran to completion
        if (status === "completed") {
          undoStackRef.current.push(snapshot)
          if (undoStackRef.current.length > UNDO_LIMIT) {
            undoStackRef.current.shift()
          }
          notifyHistory()
          sound.plop()
        }
        // Clear the active ref only if it still points to this handle
        if (activeFillRef.current?.handle === handle) {
          activeFillRef.current = null
        }
      })
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
      if (!spaceHeld) return
      const s = scrollRef.current
      if (!s) return
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        sl: s.scrollLeft,
        st: s.scrollTop,
        moved: false,
      }
      setDragging(true)
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const start = dragStartRef.current
      if (!start || !dragging) return
      const s = scrollRef.current
      if (!s) return
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      if (Math.abs(dx) + Math.abs(dy) > 3) start.moved = true
      s.scrollLeft = start.sl - dx
      s.scrollTop = start.st - dy
    }

    function handleMouseUp() {
      setDragging(false)
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
      if (e.touches.length === 2) {
        e.preventDefault()
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        const dx = t2.clientX - t1.clientX
        const dy = t2.clientY - t1.clientY
        const s = scrollRef.current
        pinchRef.current = {
          initialDistance: Math.max(1, Math.hypot(dx, dy)),
          initialZoom: zoom,
          initialMidX: (t1.clientX + t2.clientX) / 2,
          initialMidY: (t1.clientY + t2.clientY) / 2,
          initialScrollLeft: s?.scrollLeft ?? 0,
          initialScrollTop: s?.scrollTop ?? 0,
        }
      }
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
      const pinch = pinchRef.current
      if (!pinch || e.touches.length !== 2) return
      e.preventDefault()
      const t1 = e.touches[0]
      const t2 = e.touches[1]
      const distance = Math.max(
        1,
        Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
      )
      const midX = (t1.clientX + t2.clientX) / 2
      const midY = (t1.clientY + t2.clientY) / 2

      // Pinch → zoom
      const rawZoom = pinch.initialZoom * (distance / pinch.initialDistance)
      const nextZoom =
        Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(rawZoom * 20) / 20))
      setZoom(nextZoom)

      // Two-finger drag → pan
      const s = scrollRef.current
      if (s) {
        s.scrollLeft = pinch.initialScrollLeft - (midX - pinch.initialMidX)
        s.scrollTop = pinch.initialScrollTop - (midY - pinch.initialMidY)
      }
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
      if (pinchRef.current && e.touches.length < 2) {
        recentPinchEndRef.current = performance.now()
        pinchRef.current = null
      }
    }

    const cursorClass = spaceHeld
      ? dragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-crosshair"

    return (
      <div
        ref={containerRef}
        className="relative aspect-square w-full max-w-[720px]"
      >
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="absolute inset-0 touch-none overflow-auto rounded-2xl border border-amber-100/80 bg-white shadow-sm"
        >
          <div
            style={{
              width: `${100 * zoom}%`,
              height: `${100 * zoom}%`,
            }}
          >
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className={`block h-full w-full touch-none ${cursorClass}`}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-end justify-between px-3">
          <div className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-white/95 px-1.5 py-1 shadow-lg ring-1 ring-gray-200/70 backdrop-blur">
            <ToolbarButton
              onClick={undo}
              disabled={!hasHistory}
              title={t(UI.ttUndo)}
              aria-label={t(UI.ttUndo)}
            >
              <span className="text-base leading-none">↶</span>
            </ToolbarButton>
            <Divider />
            <ToolbarButton
              onClick={() => zoomBy(-ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              title={t(UI.ttZoomOut)}
              aria-label={t(UI.ttZoomOut)}
            >
              <span className="text-base leading-none">−</span>
            </ToolbarButton>
            <button
              type="button"
              onClick={resetZoom}
              title={t(UI.tt100)}
              className="min-w-[44px] rounded-full px-2 py-1 text-[11px] font-mono tabular-nums text-gray-700 hover:bg-gray-100"
            >
              {Math.round(zoom * 100)}%
            </button>
            <ToolbarButton
              onClick={() => zoomBy(ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              title={t(UI.ttZoomIn)}
              aria-label={t(UI.ttZoomIn)}
            >
              <span className="text-base leading-none">＋</span>
            </ToolbarButton>
            <Divider />
            <ToolbarButton
              onClick={toggleFullscreen}
              title={t(UI.ttFullscreen)}
              aria-label={t(UI.ttFullscreen)}
            >
              <span className="text-sm leading-none">
                {isFullscreen ? "⛶" : "⛶"}
              </span>
            </ToolbarButton>
          </div>

          {spaceHeld && (
            <div className="pointer-events-none animate-pulse rounded-full bg-gray-900/85 px-3 py-1.5 text-[11px] font-medium text-white shadow-md">
              {t(UI.dragToPan)}
            </div>
          )}
        </div>

        <DecorativeFrame />
      </div>
    )
  },
)

function DecorativeFrame() {
  // Korean traditional double-line frame with cloud-knot motifs in 4 corners.
  // Sits over the canvas, lets clicks through (pointer-events-none),
  // sits beneath the bottom toolbar (z-[5] vs toolbar z-10).
  const stroke = "#b08147"
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* outer rectangle */}
      <rect
        x="1.8"
        y="1.8"
        width="96.4"
        height="96.4"
        fill="none"
        stroke={stroke}
        strokeWidth="0.35"
        rx="2"
        ry="2"
      />
      {/* inner rectangle */}
      <rect
        x="3.6"
        y="3.6"
        width="92.8"
        height="92.8"
        fill="none"
        stroke={stroke}
        strokeWidth="0.18"
        rx="1.4"
        ry="1.4"
      />
      {/* 4 corner cloud-knot motifs (rotated copies of one path) */}
      {[
        { x: 3.6, y: 3.6, r: 0 },
        { x: 96.4, y: 3.6, r: 90 },
        { x: 96.4, y: 96.4, r: 180 },
        { x: 3.6, y: 96.4, r: 270 },
      ].map((c, i) => (
        <g
          key={i}
          transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}
          fill="none"
          stroke={stroke}
          strokeWidth="0.28"
          strokeLinecap="round"
        >
          {/* small Korean-style cloud curl into the corner */}
          <path d="M 0 4.5 Q 0 0 4.5 0" />
          <path d="M 1.4 4.5 Q 1.4 1.4 4.5 1.4" />
          {/* tiny dot ornament */}
          <circle cx="2.6" cy="2.6" r="0.3" fill={stroke} stroke="none" />
        </g>
      ))}
    </svg>
  )
}

function ToolbarButton({
  onClick,
  disabled,
  title,
  children,
  ...rest
}: {
  onClick: () => void
  disabled?: boolean
  title?: string
  children: React.ReactNode
} & React.AriaAttributes) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
      {...rest}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-0.5 h-4 w-px bg-gray-200" aria-hidden />
}
