"use client"

import { useMemo, useState } from "react"
import type React from "react"
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

const THEME_NAMES: Record<ThemeId, Localized> = {
  traditional1: UI.themeTraditional1,
  traditional2: UI.themeTraditional2,
  totoro: UI.themeTotoro,
  spirited: UI.themeSpirited,
  howl: UI.themeHowl,
  mononoke: UI.themeMononoke,
  vivid: UI.themeVivid,
  muted: UI.themeMuted,
}

const THEME_DESCS: Record<ThemeId, Localized> = {
  traditional1: UI.themeTraditional1Desc,
  traditional2: UI.themeTraditional2Desc,
  totoro: UI.themeTotoroDesc,
  spirited: UI.themeSpiritedDesc,
  howl: UI.themeHowlDesc,
  mononoke: UI.themeMononokeDesc,
  vivid: UI.themeVividDesc,
  muted: UI.themeMutedDesc,
}

function Swatch({
  color,
  isActive,
  size = 30,
  onClick,
  title,
}: {
  color: Hsl
  isActive?: boolean
  size?: number
  onClick: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-full transition-transform hover:scale-110 ${
        isActive
          ? "ring-2 ring-gray-900 ring-offset-2 ring-offset-white"
          : "ring-1 ring-gray-200"
      }`}
      style={{
        background: hslToCss(color),
        width: size,
        height: size,
      }}
    />
  )
}

function sameColor(a: Hsl, b: Hsl): boolean {
  return (
    Math.abs(a.h - b.h) < 1 &&
    Math.abs(a.s - b.s) < 1 &&
    Math.abs(a.l - b.l) < 1
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
      {children}
    </span>
  )
}

function FillModeButton({
  active,
  preview,
  label,
  onClick,
}: {
  active: boolean
  preview: React.CSSProperties
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-2.5 transition ${
        active
          ? "border-gray-900 bg-white shadow-sm"
          : "border-transparent bg-gray-100/70 hover:bg-gray-100"
      }`}
    >
      <div
        className="h-11 w-11 rounded-full ring-1 ring-gray-300/60"
        style={preview}
      />
      <span
        className={`text-[11px] font-medium ${
          active ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
        }`}
      >
        {label}
      </span>
    </button>
  )
}

export function ColorPalette({
  current,
  recent,
  fillMode,
  onPick,
  onFillModeChange,
}: Props) {
  const { t } = useLocale()
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID)
  const [showMore, setShowMore] = useState(false)

  const currentHex = useMemo(() => hslToHex(current), [current])
  const activeTheme = useMemo(
    () => PALETTE_THEMES.find((th) => th.id === themeId) ?? PALETTE_THEMES[0],
    [themeId],
  )
  const activeColors = useMemo(() => themeColors(activeTheme), [activeTheme])
  const harmonyColors = useMemo(() => harmony(current), [current])
  const contrastColors = useMemo(() => contrast(current), [current])

  // Fill mode previews use the actual current color, so kids see what each mode produces
  const lighterCss = hslToCss({
    ...current,
    l: Math.min(95, current.l + 22),
  })
  const darkerCss = hslToCss({
    ...current,
    l: Math.max(12, current.l - 18),
  })
  const currentCss = hslToCss(current)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-amber-100/80 bg-white/75 p-4 shadow-sm backdrop-blur">
      {/* ─── 1. Themes ─── */}
      <section className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <SectionLabel>{t(UI.palThemes)}</SectionLabel>
          <span className="text-[10px] text-gray-400">
            {t(THEME_DESCS[activeTheme.id])}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {PALETTE_THEMES.map((th) => (
            <button
              key={th.id}
              type="button"
              onClick={() => setThemeId(th.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                themeId === th.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t(THEME_NAMES[th.id])}
            </button>
          ))}
        </div>
      </section>

      {/* ─── 2. Color grid ─── */}
      <div className="grid grid-cols-6 gap-2">
        {activeColors.map((c, i) => (
          <Swatch
            key={`${activeTheme.id}-${i}`}
            color={c}
            size={30}
            isActive={sameColor(c, current)}
            onClick={() => onPick(c)}
          />
        ))}
      </div>

      <div className="border-t border-amber-100/70" />

      {/* ─── 3. Fill mode big preview buttons ─── */}
      <section className="space-y-2">
        <SectionLabel>{t(UI.palFillMode)}</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          <FillModeButton
            active={fillMode === "solid"}
            label={t(UI.palFillSolid)}
            preview={{ background: currentCss }}
            onClick={() => onFillModeChange("solid")}
          />
          <FillModeButton
            active={fillMode === "linear"}
            label={t(UI.palFillLinear)}
            preview={{
              background: `linear-gradient(to bottom, ${lighterCss}, ${darkerCss})`,
            }}
            onClick={() => onFillModeChange("linear")}
          />
          <FillModeButton
            active={fillMode === "radial"}
            label={t(UI.palFillRadial)}
            preview={{
              background: `radial-gradient(circle at 35% 35%, ${lighterCss} 0%, ${darkerCss} 100%)`,
            }}
            onClick={() => onFillModeChange("radial")}
          />
        </div>
      </section>

      <div className="border-t border-amber-100/70" />

      {/* ─── 4. More toggle (harmony, contrast, L slider, custom picker, recent) ─── */}
      <section className="space-y-3">
        <button
          type="button"
          onClick={() => setShowMore((s) => !s)}
          className="flex w-full items-center justify-between text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 transition hover:text-gray-900"
        >
          <span>✨ {t(UI.palMore)}</span>
          <span className="text-xs">{showMore ? "▾" : "▸"}</span>
        </button>

        {showMore && (
          <div className="space-y-4">
            {/* Current color + custom picker + L slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <SectionLabel>{t(UI.palCurrent)}</SectionLabel>
                <span className="font-mono text-[10px] text-gray-400">
                  {currentHex}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-9 flex-1 rounded-lg ring-1 ring-gray-200/80"
                  style={{ background: currentCss }}
                />
                <label
                  className="relative grid h-9 w-9 cursor-pointer place-items-center overflow-hidden rounded-lg ring-1 ring-gray-300 bg-gradient-to-br from-rose-300 via-amber-200 to-sky-300"
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

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>{t(UI.palDarker)}</span>
                  <span className="font-mono">L {Math.round(current.l)}</span>
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
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <SectionLabel>{t(UI.palHarmonyLabel)}</SectionLabel>
                <span className="text-[10px] text-gray-400">
                  {t(UI.palHarmonyHint)}
                </span>
              </div>
              <div className="flex gap-2">
                {harmonyColors.map((c, i) => (
                  <Swatch
                    key={`h-${i}`}
                    color={c}
                    size={26}
                    onClick={() => onPick(c)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <SectionLabel>{t(UI.palContrastLabel)}</SectionLabel>
                <span className="text-[10px] text-gray-400">
                  {t(UI.palContrastHint)}
                </span>
              </div>
              <div className="flex gap-2">
                {contrastColors.map((c, i) => (
                  <Swatch
                    key={`c-${i}`}
                    color={c}
                    size={26}
                    onClick={() => onPick(c)}
                  />
                ))}
              </div>
            </div>

            {recent.length > 0 && (
              <div className="space-y-2">
                <SectionLabel>{t(UI.palRecent)}</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {recent.map((c, i) => (
                    <Swatch
                      key={`r-${i}`}
                      color={c}
                      size={24}
                      isActive={sameColor(c, current)}
                      onClick={() => onPick(c)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
