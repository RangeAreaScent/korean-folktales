"use client"

import { useMemo, useState } from "react"
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
      className={`rounded-full transition-transform active:scale-90 ${
        active
          ? "ring-2 ring-gray-900 ring-offset-2 ring-offset-amber-50"
          : "ring-1 ring-gray-200/80"
      }`}
      style={{ background: hslToCss(color), width: size, height: size }}
      aria-label={`Pick color ${hslToHex(color)}`}
      aria-pressed={active}
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
      {children}
    </span>
  )
}

export function MobilePaletteSheet({
  current,
  recent,
  fillMode,
  onPick,
  onFillModeChange,
}: Props) {
  const { t } = useLocale()
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID)

  const currentHex = useMemo(() => hslToHex(current), [current])
  const themeSwatches = useMemo(() => {
    const theme = PALETTE_THEMES.find((th) => th.id === themeId)!
    return themeColors(theme)
  }, [themeId])
  const harmonySwatches = useMemo(() => harmony(current), [current])
  const contrastSwatches = useMemo(() => contrast(current), [current])

  return (
    <div className="rounded-t-3xl bg-gradient-to-b from-amber-50/98 to-rose-50/95 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.12)] ring-1 ring-amber-100/80 lg:hidden">
      {/* ─── 1. Theme chips — scroll affordance via right-edge fade ─── */}
      <div className="relative px-3 pt-2.5">
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1 pr-6"
          style={{ scrollbarWidth: "none" }}
        >
          {PALETTE_THEMES.map((th) => {
            const isActive = th.id === themeId
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setThemeId(th.id)}
                className={`flex-shrink-0 truncate rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-white/80 text-gray-700 ring-1 ring-gray-200/70 hover:bg-white"
                }`}
                style={{ maxWidth: 96 }}
              >
                {t(THEME_SHORT[th.id])}
              </button>
            )
          })}
        </div>
        {/* Right-edge fade hints that the chip row is horizontally
            scrollable. The pseudo-gradient sits above the strip so users
            see content "disappearing" into a soft edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-3 top-2.5 bottom-1 w-8"
          style={{
            background:
              "linear-gradient(to right, rgba(255,250,232,0) 0%, rgba(255,250,232,0.95) 70%)",
          }}
        />
      </div>

      {/* ─── 2. Theme color grid ─── */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-8 justify-items-center gap-2">
          {themeSwatches.map((c, i) => (
            <Swatch
              key={`theme-${i}`}
              color={c}
              active={sameColor(c, current)}
              size={30}
              onClick={() => onPick(c)}
            />
          ))}
        </div>
      </div>

      {/* ─── 3. Fill style chips ─── */}
      <div className="flex items-center gap-1.5 border-t border-amber-100/70 px-3 py-2">
        <SectionLabel>{t(UI.palFillMode)}</SectionLabel>
        <div className="ml-auto flex items-center gap-1.5">
          {(
            [
              { id: "solid", label: t(UI.palFillSolid) },
              { id: "linear", label: t(UI.palFillLinear) },
              { id: "radial", label: t(UI.palFillRadial) },
            ] as const
          ).map((m) => {
            const active = fillMode === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onFillModeChange(m.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                  active
                    ? "bg-gray-900 text-white"
                    : "bg-white/80 text-gray-700 ring-1 ring-gray-200/70 hover:bg-white"
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 4. Recent ─── */}
      {recent.length > 0 && (
        <div className="flex items-center gap-3 border-t border-amber-100/70 px-4 py-2">
          <SectionLabel>{t(UI.palRecent)}</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {recent.slice(0, 8).map((c, i) => (
              <Swatch
                key={`recent-${i}`}
                color={c}
                active={sameColor(c, current)}
                size={24}
                onClick={() => onPick(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── 5. Harmony (dynamic per current color) ─── */}
      <div className="flex items-center gap-3 border-t border-amber-100/70 px-4 py-2">
        <SectionLabel>{t(UI.palHarmonyChip)}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {harmonySwatches.map((c, i) => (
            <Swatch
              key={`harmony-${i}`}
              color={c}
              active={sameColor(c, current)}
              size={24}
              onClick={() => onPick(c)}
            />
          ))}
        </div>
      </div>

      {/* ─── 6. Contrast (dynamic per current color) ─── */}
      <div className="flex items-center gap-3 border-t border-amber-100/70 px-4 py-2">
        <SectionLabel>{t(UI.palContrastChip)}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {contrastSwatches.map((c, i) => (
            <Swatch
              key={`contrast-${i}`}
              color={c}
              active={sameColor(c, current)}
              size={24}
              onClick={() => onPick(c)}
            />
          ))}
        </div>
      </div>

      {/* ─── 7. Darker / Lighter slider + custom color picker beside ─── */}
      <div className="flex items-center gap-3 border-t border-amber-100/70 px-4 py-2.5">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] text-gray-400">
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
            className="block h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-gray-900 via-gray-400 to-white accent-gray-900"
            aria-label={t(UI.palLighter)}
          />
        </div>
        <label
          className="relative grid h-9 w-9 flex-shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg ring-1 ring-gray-300 bg-gradient-to-br from-rose-300 via-amber-200 to-sky-300"
          title={t(UI.palCustom)}
        >
          <input
            type="color"
            value={currentHex}
            onChange={(e) => onPick(hexToHsl(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <span className="pointer-events-none text-sm">🎯</span>
        </label>
      </div>
    </div>
  )
}
