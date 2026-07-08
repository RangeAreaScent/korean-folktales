"use client"

import { useMemo, useRef, useState } from "react"
import {
  contrast,
  DEFAULT_THEME_ID,
  harmony,
  hexToHsl,
  hslToCss,
  hslToHex,
  PALETTE_THEMES,
  themeColors,
  type Hsl,
  type ThemeId,
} from "@/lib/colors"
import { useLocale, type Localized } from "@/lib/i18n"
import { UI } from "@/lib/strings"
import type { FillMode } from "./ColoringCanvas"

type Props = {
  current: Hsl
  recent: Hsl[]
  fillMode: FillMode
  onPick: (color: Hsl) => void
  onFillModeChange: (mode: FillMode) => void
}

const THEME_SHORT: Record<ThemeId, Localized> = {
  traditional1: UI.themeTraditional1Short,
  traditional2: UI.themeTraditional2Short,
  totoro: UI.themeTotoroShort,
  spirited: UI.themeSpiritedShort,
  howl: UI.themeHowlShort,
  mononoke: UI.themeMononokeShort,
  vivid: UI.themeVividShort,
  muted: UI.themeMutedShort,
}

const FILL_MODES = [
  { id: "solid" as const, label: UI.palFillSolid },
  { id: "linear" as const, label: UI.palFillLinear },
  { id: "radial" as const, label: UI.palFillRadial },
]

function sameColor(a: Hsl, b: Hsl): boolean {
  return (
    Math.abs(a.h - b.h) < 1 &&
    Math.abs(a.s - b.s) < 1 &&
    Math.abs(a.l - b.l) < 1
  )
}

function Swatch({
  color,
  active,
  size,
  onClick,
}: {
  color: Hsl
  active: boolean
  size: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 rounded-full ring-[0.5px] ring-black/10 transition-transform ${
        active ? "scale-[1.2]" : "active:scale-90"
      }`}
      style={{
        background: hslToCss(color),
        width: size,
        height: size,
        boxShadow: active
          ? "0 0 0 1.6px var(--sheet-label), 0 1px 2px rgba(0,0,0,0.15)"
          : "0 1px 2px rgba(0,0,0,0.15)",
      }}
      aria-label={`Pick color ${hslToHex(color)}`}
      aria-pressed={active}
    />
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="w-[52px] flex-shrink-0 text-[12px] font-medium"
      style={{ color: "var(--sheet-label-2)" }}
    >
      {children}
    </span>
  )
}

const DRAG_OPEN_THRESHOLD = 40 // px of upward drag needed to snap open
const DRAG_CLOSE_THRESHOLD = 40 // px of downward drag needed to snap closed

export function MobilePaletteSheet({
  current,
  recent,
  fillMode,
  onPick,
  onFillModeChange,
}: Props) {
  const { t } = useLocale()
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID)
  const [expanded, setExpanded] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartYRef = useRef(0)
  const expandRegionRef = useRef<HTMLDivElement>(null)

  const currentHex = useMemo(() => hslToHex(current), [current])
  const themeSwatches = useMemo(() => {
    const theme = PALETTE_THEMES.find((th) => th.id === themeId)!
    return themeColors(theme)
  }, [themeId])
  const harmonySwatches = useMemo(() => harmony(current), [current])
  const contrastSwatches = useMemo(() => contrast(current), [current])
  const fillModeIndex = FILL_MODES.findIndex((m) => m.id === fillMode)

  function handlePointerDown(e: React.PointerEvent) {
    dragStartYRef.current = e.clientY
    setDragging(true)
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return
    // Drag up = negative delta = opening gesture. Only let the sheet follow
    // the finger in the "closed→open" direction (dragging up while closed,
    // or down while open) — a small overshoot the other way is ignored so
    // the sheet doesn't rubber-band past its resting states.
    const delta = e.clientY - dragStartYRef.current
    if (!expanded) {
      setDragOffset(Math.min(0, delta))
    } else {
      setDragOffset(Math.max(0, delta))
    }
  }

  function handlePointerUp() {
    if (!dragging) return
    setDragging(false)
    if (!expanded && dragOffset < -DRAG_OPEN_THRESHOLD) {
      setExpanded(true)
    } else if (expanded && dragOffset > DRAG_CLOSE_THRESHOLD) {
      setExpanded(false)
    }
    setDragOffset(0)
  }

  // Live height while dragging: pulls the collapsed region's max-height from
  // 0 toward the content's natural height (or back) proportional to drag
  // distance, so the sheet visually follows the finger before the snap.
  const dragProgress = expanded
    ? Math.max(0, 1 - dragOffset / 160)
    : Math.min(1, -dragOffset / 160)

  return (
    <div
      className="overflow-hidden rounded-t-[22px] lg:hidden"
      style={
        {
          background: "rgba(249,249,251,0.92)",
          backdropFilter: "blur(28px) saturate(1.7)",
          WebkitBackdropFilter: "blur(28px) saturate(1.7)",
          boxShadow: "0 -8px 26px -12px rgba(0,0,0,0.18)",
          "--sheet-label": "#1c1c1e",
          "--sheet-label-2": "#6b6b70",
          "--sheet-label-3": "#8e8e93",
        } as React.CSSProperties
      }
    >
      {/* ─── Grabber — tap or drag to expand/collapse ─── */}
      <div
        className="flex cursor-grab touch-none flex-col items-center pt-2 pb-1.5 active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={() => !dragging && setExpanded((v) => !v)}
      >
        <div
          className="h-[5px] w-9 rounded-full"
          style={{ background: "rgba(60,60,67,0.28)" }}
        />
      </div>

      {/* ─── Peek content — always visible: themes, swatch grid, fill style ─── */}
      <div className="px-3 pb-1">
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {PALETTE_THEMES.map((th) => {
            const isActive = th.id === themeId
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setThemeId(th.id)}
                className="flex-shrink-0 truncate rounded-full px-3 py-[5px] text-[12px] font-medium transition"
                style={{
                  maxWidth: 92,
                  background: isActive ? "var(--accent, #1c1c1e)" : "rgba(120,120,128,0.12)",
                  color: isActive ? "#fff" : "var(--sheet-label-2)",
                }}
              >
                {t(THEME_SHORT[th.id])}
              </button>
            )
          })}
        </div>

        <div
          className="rounded-[13px]"
          style={{ background: "rgba(255,255,255,0.72)" }}
        >
          <div className="flex flex-wrap gap-[7px] p-2.5">
            {themeSwatches.map((c, i) => (
              <Swatch
                key={`theme-${i}`}
                color={c}
                active={sameColor(c, current)}
                size={21}
                onClick={() => onPick(c)}
              />
            ))}
          </div>

          {/* Fill style — label + segmented control on one line */}
          <div
            className="flex items-center gap-2.5 px-2.5 pb-2.5 pt-2"
            style={{ borderTop: "0.5px solid rgba(60,60,67,0.1)" }}
          >
            <RowLabel>{t(UI.palFillMode)}</RowLabel>
            <div
              className="relative grid h-[27px] flex-1 grid-cols-3 gap-0.5 rounded-[8px] p-0.5"
              style={{ background: "rgba(120,120,128,0.16)" }}
            >
              <div
                className="absolute inset-y-0.5 rounded-[6px] bg-white transition-transform duration-300 ease-out"
                style={{
                  width: "calc(33.333% - 2.67px)",
                  left: "2px",
                  transform: `translateX(${fillModeIndex * 100}%)`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 1px rgba(0,0,0,0.08)",
                }}
              />
              {FILL_MODES.map((m) => {
                const active = fillMode === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onFillModeChange(m.id)}
                    className="relative z-10 text-[11px] transition-colors"
                    style={{
                      color: active ? "var(--sheet-label)" : "var(--sheet-label-2)",
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {t(m.label)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Expand handle hint ─── */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-center gap-1 pb-1 pt-0.5 text-[10.5px] font-semibold"
        style={{ color: "var(--sheet-label-3)" }}
      >
        {expanded ? t(UI.palCollapseHint) : t(UI.palExpandHint)}
        <svg
          viewBox="0 0 24 24"
          width="11"
          height="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* ─── Expandable region — recent/harmony/contrast + slider/custom ─── */}
      <div
        ref={expandRegionRef}
        className="grid overflow-hidden px-3"
        style={{
          gridTemplateRows: dragging
            ? `${dragProgress}fr`
            : expanded
              ? "1fr"
              : "0fr",
          transition: dragging ? "none" : "grid-template-rows 0.32s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="mb-2 rounded-[13px]"
            style={{ background: "rgba(255,255,255,0.72)" }}
          >
            {recent.length > 0 && (
              <div
                className="flex items-center gap-2.5 px-2.5 py-2"
                style={{ borderBottom: "0.5px solid rgba(60,60,67,0.1)" }}
              >
                <RowLabel>{t(UI.palRecent)}</RowLabel>
                <div className="flex flex-wrap gap-[6px]">
                  {recent.slice(0, 8).map((c, i) => (
                    <Swatch
                      key={`recent-${i}`}
                      color={c}
                      active={sameColor(c, current)}
                      size={19}
                      onClick={() => onPick(c)}
                    />
                  ))}
                </div>
              </div>
            )}
            <div
              className="flex items-center gap-2.5 px-2.5 py-2"
              style={{ borderBottom: "0.5px solid rgba(60,60,67,0.1)" }}
            >
              <RowLabel>{t(UI.palHarmonyChip)}</RowLabel>
              <div className="flex flex-wrap gap-[6px]">
                {harmonySwatches.map((c, i) => (
                  <Swatch
                    key={`harmony-${i}`}
                    color={c}
                    active={sameColor(c, current)}
                    size={19}
                    onClick={() => onPick(c)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <RowLabel>{t(UI.palContrastChip)}</RowLabel>
              <div className="flex flex-wrap gap-[6px]">
                {contrastSwatches.map((c, i) => (
                  <Swatch
                    key={`contrast-${i}`}
                    color={c}
                    active={sameColor(c, current)}
                    size={19}
                    onClick={() => onPick(c)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="mb-2.5 flex items-center gap-2.5 rounded-[13px] p-2.5"
            style={{ background: "rgba(255,255,255,0.72)" }}
          >
            <div className="flex-1">
              <div
                className="mb-1.5 flex justify-between text-[10px] font-medium"
                style={{ color: "var(--sheet-label-3)" }}
              >
                <span>{t(UI.palDarker)}</span>
                <span>{t(UI.palLighter)}</span>
              </div>
              <input
                type="range"
                min={5}
                max={95}
                step={1}
                value={Math.round(current.l)}
                onChange={(e) =>
                  onPick({ ...current, l: parseInt(e.target.value, 10) })
                }
                className="ios-native-slider block h-1 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, var(--accent, #1c1c1e) ${Math.round(current.l)}%, rgba(120,120,128,0.2) ${Math.round(current.l)}%)`,
                }}
                aria-label={t(UI.palLighter)}
              />
            </div>
            <label
              className="relative grid h-9 w-9 flex-shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[11px] ring-[0.5px] ring-black/10"
              style={{
                background: "linear-gradient(135deg, #f7c9c9, #f5dca3, #a9d8e8)",
              }}
              title={t(UI.palCustom)}
            >
              <input
                type="color"
                value={currentHex}
                onChange={(e) => onPick(hexToHsl(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="rgba(0,0,0,0.65)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none"
                aria-hidden
              >
                <path d="M15.5 5.5l3 3L8 19H5v-3z" />
                <path d="M13 8l3-3 3 3-3 3" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
