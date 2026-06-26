"use client"

import { useLocale } from "@/lib/i18n"
import { UI } from "@/lib/strings"

type Props = {
  hasHistory: boolean
  zoom: number
  canZoomIn: boolean
  canZoomOut: boolean
  onUndo: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onToggleFullscreen: () => void
  onErase?: () => void
  eraseActive?: boolean
}

/**
 * Desktop-only control strip rendered DIRECTLY BELOW the canvas:
 *
 *   [↶ Undo]  [🗑 Erase]    [⊖ 100% ⊕]   [⛶ Fullscreen]
 *
 * Mirrors the mobile control strip pattern but with full labels and a
 * different right-side cluster (no story modal, no locale/sound — those
 * are already in the inline narration / floating cluster on desktop).
 */
export function DesktopControlBar({
  hasHistory,
  zoom,
  canZoomIn,
  canZoomOut,
  onUndo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
  onErase,
  eraseActive,
}: Props) {
  const { t } = useLocale()
  return (
    <div className="hidden w-full max-w-[960px] items-center justify-between gap-3 lg:flex">
      {/* LEFT: undo + erase */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!hasHistory}
          title={t(UI.ttUndo)}
          className="flex items-center gap-1.5 rounded-full border border-gray-400/60 bg-white/90 px-3 py-1.5 text-[12.5px] font-medium text-gray-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H9" />
          </svg>
          <span>{t(UI.scUndo)}</span>
        </button>
        {onErase && (
          <button
            type="button"
            onClick={onErase}
            title={t(UI.eraseRegion)}
            aria-pressed={!!eraseActive}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium shadow-sm transition ${
              eraseActive
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-400/60 bg-white/90 text-gray-700 hover:bg-white"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M16 3l5 5L8 21H3v-5L16 3z" />
              <path d="M12 7l5 5" />
            </svg>
            <span>{t(UI.eraseRegion)}</span>
          </button>
        )}
      </div>

      {/* CENTER: zoom controls */}
      <div className="flex items-center gap-0.5 rounded-full border border-gray-400/60 bg-white/90 px-1.5 py-1 shadow-sm">
        <button
          type="button"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          title={t(UI.ttZoomOut)}
          aria-label={t(UI.ttZoomOut)}
          className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="text-base leading-none">−</span>
        </button>
        <button
          type="button"
          onClick={onResetZoom}
          title={t(UI.tt100)}
          className="min-w-[52px] rounded-full px-2 py-1 font-mono text-[11.5px] tabular-nums text-gray-700 hover:bg-gray-100"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          title={t(UI.ttZoomIn)}
          aria-label={t(UI.ttZoomIn)}
          className="grid h-8 w-8 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="text-base leading-none">＋</span>
        </button>
      </div>

      {/* RIGHT: fullscreen */}
      <button
        type="button"
        onClick={onToggleFullscreen}
        title={t(UI.ttFullscreen)}
        aria-label={t(UI.ttFullscreen)}
        className="grid h-9 w-9 place-items-center rounded-full border border-gray-400/60 bg-white/90 text-gray-700 shadow-sm transition hover:bg-white"
      >
        <span className="text-sm leading-none">⛶</span>
      </button>
    </div>
  )
}
