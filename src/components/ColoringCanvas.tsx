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
  eraseRegion,
  floodFill,
  type FillStyle,
  type FloodFillHandle,
  type Rgb,
} from "@/lib/floodfill"
import { hslToRgb, type Hsl } from "@/lib/colors"
import { useLocale } from "@/lib/i18n"
import { sound } from "@/lib/sound"
import { UI } from "@/lib/strings"

// Internal canvas resolution. 2048 = print-quality (315 DPI for 6.5" print).
// 4× more pixels than 1024, so undo + fill timing are tuned below.
// Display size is CSS-controlled (max-w-[768px] aspect-square — the
// canvas now stretches to fill the desktop main column up to that cap).
const CANVAS_SIZE = 2048
// Undo stack holds full ImageData snapshots (CANVAS_SIZE² × 4 bytes each).
// At 2048: 16MB per snapshot. Cap at 7 to keep mobile memory comfortable
// (~110MB peak headroom).
const UNDO_LIMIT = 7
const MIN_ZOOM = 1
const MAX_ZOOM = 8
const ZOOM_STEP = 0.5
// Wavefront fill animation duration. Stretched from 180ms → 320ms so the
// animation still lasts longer than the BFS work for typical large regions
// at the 2048 resolution.
const FILL_ANIMATE_MS = 320

export type FillMode = "solid" | "linear" | "radial"

export type ColoringCanvasHandle = {
  reset: () => void
  undo: () => void
  canUndo: () => boolean
  toDataURL: () => string | null
  getCanvas: () => HTMLCanvasElement | null
  zoomBy: (delta: number) => void
  resetZoom: () => void
  toggleFullscreen: () => void
  setEraseMode: (on: boolean) => void
}

type Props = {
  imageSrc: string
  fillColor: Hsl
  fillMode: FillMode
  onError?: (msg: string) => void
  /** Hide the floating bottom-left toolbar so a parent can render an
   *  external one (mobile control strip). Keyboard shortcuts still work. */
  hideToolbar?: boolean
  /** Fired whenever zoom changes — let the parent render a synced value
   *  in an external toolbar. */
  onZoomChange?: (zoom: number) => void
  /** Fired whenever the undo stack becomes (non-)empty. */
  onHistoryChange?: (hasHistory: boolean) => void
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
    {
      imageSrc,
      fillColor,
      fillMode,
      onError,
      hideToolbar,
      onZoomChange,
      onHistoryChange,
    },
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
      lastZoom: number
    } | null>(null)
    const recentPinchEndRef = useRef<number>(0)
    const pinchRafRef = useRef<number | null>(null)
    // Trackpad pinch (macOS Safari/Chrome synthesize it as wheel + ctrlKey).
    // Tracks zoom outside React state so rapid wheel events compound
    // correctly without waiting on a render between each one.
    const wheelZoomRef = useRef(1)
    const wheelRafRef = useRef<number | null>(null)
    // Single-finger pan when zoomed in (mobile-only) — distinct from
    // pinch (two fingers) and from desktop space-held drag.
    const touchPanRef = useRef<{
      startX: number
      startY: number
      startScrollLeft: number
      startScrollTop: number
      moved: boolean
    } | null>(null)

    const [zoom, setZoom] = useState(1)
    const [spaceHeld, setSpaceHeld] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hasHistory, setHasHistory] = useState(false)
    const eraseModeRef = useRef(false)

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
    }, [notifyHistory, t])

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
      zoomBy,
      resetZoom,
      toggleFullscreen,
      setEraseMode: (on: boolean) => {
        eraseModeRef.current = on
      },
    }))

    // Sync zoom changes outward so a parent toolbar can render the same value.
    useEffect(() => {
      onZoomChange?.(zoom)
    }, [zoom, onZoomChange])

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
        // Zoom shortcuts — Cmd/Ctrl + (=/-/0) is reserved by the browser
        // for native page-zoom and can't be overridden by a regular web
        // page. So we listen for plain "+" / "-" / "0" (no modifier).
        // Inputs are already excluded via isTypingTarget above.
        if (!meta && (e.key === "+" || e.key === "=")) {
          e.preventDefault()
          zoomBy(ZOOM_STEP)
          return
        }
        if (!meta && (e.key === "-" || e.key === "_")) {
          e.preventDefault()
          zoomBy(-ZOOM_STEP)
          return
        }
        if (!meta && e.key === "0") {
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

    // Keep the wheel-zoom ref in sync with the committed zoom state so a
    // trackpad pinch that starts after a button/keyboard/touch zoom change
    // continues from the right value instead of an earlier snapshot.
    useEffect(() => {
      wheelZoomRef.current = zoom
    }, [zoom])

    function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
      // Trackpad pinch-to-zoom is reported by the browser as a wheel event
      // with ctrlKey set (this is true even though the user never touched
      // an actual Ctrl key). Plain two-finger scroll (no ctrlKey) is left
      // alone so normal panning/scrolling still works.
      if (!e.ctrlKey) return
      e.preventDefault()
      const s = scrollRef.current
      if (!s) return

      const z = wheelZoomRef.current
      // Negative deltaY = fingers spreading apart = zoom in (matches the
      // native browser pinch-zoom convention).
      const factor = Math.exp(-e.deltaY * 0.008)
      const rawZoom = z * factor
      const nextZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, Math.round(rawZoom * 100) / 100),
      )

      // Anchor the zoom at the cursor position, same math as the touch
      // pinch handler below.
      const rect = s.getBoundingClientRect()
      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top
      const ratio = nextZoom / z
      s.scrollLeft = (s.scrollLeft + localX) * ratio - localX
      s.scrollTop = (s.scrollTop + localY) * ratio - localY

      wheelZoomRef.current = nextZoom
      if (wheelRafRef.current == null) {
        wheelRafRef.current = requestAnimationFrame(() => {
          setZoom(wheelZoomRef.current)
          wheelRafRef.current = null
        })
      }
    }

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

      // Erase mode — wipe the clicked region back to white. Uses the
      // line-art (not color tolerance) as the boundary so gradient /
      // radial fills get cleared cleanly.
      if (eraseModeRef.current) {
        const prior = eraseRegion(ctx, CANVAS_SIZE, CANVAS_SIZE, x, y)
        if (prior) {
          undoStackRef.current.push(prior)
          if (undoStackRef.current.length > UNDO_LIMIT) {
            undoStackRef.current.shift()
          }
          notifyHistory()
          sound.plop()
        }
        return
      }

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
      // Play the brush sound the instant the fill starts — waiting for the
      // 320ms fill animation to complete makes the audio feel laggy.
      sound.plop()
      activeFillRef.current = { handle, snapshot }
      handle.done.then((status) => {
        // Only commit to undo stack if the animation ran to completion
        if (status === "completed") {
          undoStackRef.current.push(snapshot)
          if (undoStackRef.current.length > UNDO_LIMIT) {
            undoStackRef.current.shift()
          }
          notifyHistory()
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
          lastZoom: zoom,
        }
        // If a single-finger pan was in progress, cancel it.
        touchPanRef.current = null
      } else if (e.touches.length === 1 && zoom > 1) {
        // Single-finger drag = pan when zoomed in. At zoom=1 nothing to
        // pan, so we let the touch fall through to a normal fill-click.
        const t = e.touches[0]
        const s = scrollRef.current
        touchPanRef.current = {
          startX: t.clientX,
          startY: t.clientY,
          startScrollLeft: s?.scrollLeft ?? 0,
          startScrollTop: s?.scrollTop ?? 0,
          moved: false,
        }
      }
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
      // Pinch zoom + pan with two fingers
      const pinch = pinchRef.current
      if (pinch && e.touches.length === 2) {
        e.preventDefault()
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        const distance = Math.max(
          1,
          Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
        )
        const midX = (t1.clientX + t2.clientX) / 2
        const midY = (t1.clientY + t2.clientY) / 2

        // Compute target zoom — 1% steps (was 5%) so the gesture reads as
        // continuous instead of stair-stepped.
        const rawZoom = pinch.initialZoom * (distance / pinch.initialDistance)
        const nextZoom =
          Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(rawZoom * 100) / 100))

        const s = scrollRef.current
        if (s) {
          // ANCHOR the zoom at the pinch midpoint (relative to the viewport
          // of the scroll container) so the image grows / shrinks around the
          // fingers — not from the top-left corner.
          const rect = s.getBoundingClientRect()
          const localMidX = midX - rect.left
          const localMidY = midY - rect.top
          // The image point under the pinch midpoint stays put when zoom
          // changes. After zoom z → z': newScroll = (oldScroll + local) *
          // (z'/z) - local.
          const ratio = nextZoom / pinch.lastZoom
          s.scrollLeft = (s.scrollLeft + localMidX) * ratio - localMidX
          s.scrollTop = (s.scrollTop + localMidY) * ratio - localMidY
          // Also handle two-finger pan: shift by midpoint delta vs initial.
          s.scrollLeft -= midX - pinch.initialMidX
          s.scrollTop -= midY - pinch.initialMidY
          // Reset the initial-midpoint reference each frame so the pan
          // delta is per-frame (otherwise it accumulates wrong).
          pinch.initialMidX = midX
          pinch.initialMidY = midY
        }
        pinch.lastZoom = nextZoom
        // Defer the React state update to the next animation frame so we
        // don't trigger a re-render on every touchmove (which was the
        // source of the zigzag/stutter). The DOM scroll position is already
        // applied above for instant visual feedback.
        if (pinchRafRef.current == null) {
          pinchRafRef.current = requestAnimationFrame(() => {
            const target = pinchRef.current?.lastZoom
            if (target != null) setZoom(target)
            pinchRafRef.current = null
          })
        }
        return
      }

      // Single-finger pan (only when zoomed in)
      const pan = touchPanRef.current
      if (pan && e.touches.length === 1) {
        const t = e.touches[0]
        const dx = t.clientX - pan.startX
        const dy = t.clientY - pan.startY
        if (Math.abs(dx) + Math.abs(dy) > 6) pan.moved = true
        const s = scrollRef.current
        if (s) {
          s.scrollLeft = pan.startScrollLeft - dx
          s.scrollTop = pan.startScrollTop - dy
        }
      }
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
      if (pinchRef.current && e.touches.length < 2) {
        recentPinchEndRef.current = performance.now()
        // Make sure the final zoom state lands in React.
        const finalZoom = pinchRef.current.lastZoom
        if (pinchRafRef.current != null) {
          cancelAnimationFrame(pinchRafRef.current)
          pinchRafRef.current = null
        }
        setZoom(finalZoom)
        pinchRef.current = null
      }
      // If a single-finger pan moved, prevent the trailing synthetic click
      // from triggering a fill.
      if (touchPanRef.current?.moved) {
        recentPinchEndRef.current = performance.now()
      }
      if (e.touches.length === 0) {
        touchPanRef.current = null
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
        className="relative aspect-square w-full max-w-[768px]"
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
          onWheel={handleWheel}
          className="absolute inset-0 touch-none overflow-auto bg-white shadow-lg"
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

        <div className={`pointer-events-none absolute inset-x-0 bottom-3 z-10 flex items-end justify-between px-3 ${hideToolbar ? "hidden" : ""}`}>
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
      </div>
    )
  },
)

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
