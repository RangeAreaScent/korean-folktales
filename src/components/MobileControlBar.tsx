"use client"

import { useLocale } from "@/lib/i18n"
import { UI } from "@/lib/strings"
import { SoundToggle } from "./SoundToggle"

type PrimaryAction =
  | null
  | { label: string; onClick: () => void; disabled?: boolean }

type Props = {
  hasHistory: boolean
  pageLabel: string // e.g. "1 / 4"
  primaryAction: PrimaryAction
  eraseActive?: boolean
  onUndo: () => void
  onErase?: () => void
  onOpenNarration: () => void
}

/**
 * Mobile-only control strip directly under the canvas:
 *
 *   [↶ undo]  [1/4]            [Continue →] [📖] [🔊]
 *
 * - Undo lives in its OWN rounded container (functional control)
 * - Page indicator lives in its OWN small chip (status)
 * - Primary scene-progression button (Continue / Choose path) merges into
 *   this same row so the palette can sit higher
 * - Locale toggle moved into NarrationModal (frees lateral room here)
 * - Fullscreen + zoom buttons were dropped — pinch zoom covers that need
 */
export function MobileControlBar({
  hasHistory,
  pageLabel,
  primaryAction,
  eraseActive,
  onUndo,
  onErase,
  onOpenNarration,
}: Props) {
  const { t } = useLocale()
  return (
    <div className="flex w-full items-center gap-2 lg:hidden">
      {/* LEFT cluster — distinct undo button + standalone page chip */}
      <button
        type="button"
        onClick={onUndo}
        disabled={!hasHistory}
        title={t(UI.ttUndo)}
        aria-label={t(UI.ttUndo)}
        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white/95 text-gray-700 shadow-sm ring-1 ring-gray-400/50 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
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
      </button>

      <span
        className="select-none rounded-full bg-white/70 px-2.5 py-1 font-mono text-[11px] tabular-nums text-gray-500 ring-1 ring-gray-400/40"
        aria-label="Scene progress"
      >
        {pageLabel}
      </span>

      {onErase && (
        <button
          type="button"
          onClick={onErase}
          aria-pressed={!!eraseActive}
          title={t(UI.eraseRegion)}
          aria-label={t(UI.eraseRegion)}
          className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full shadow-sm ring-1 transition ${
            eraseActive
              ? "bg-gray-900 text-white ring-gray-900"
              : "bg-white/95 text-gray-700 ring-gray-400/50 hover:bg-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
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
        </button>
      )}

      {/* RIGHT cluster — utility icons first, primary action LAST so the
          most-tapped CTA sits at the natural right-edge thumb position. */}
      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={onOpenNarration}
          title={t(UI.ttStory)}
          aria-label={t(UI.ttStory)}
          className="grid h-9 w-9 place-items-center rounded-full border border-gray-400/60 bg-white/85 text-base shadow-sm transition hover:bg-white"
        >
          📖
        </button>
        <SoundToggle />
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            className="flex items-center gap-1 rounded-full border border-gray-900/85 bg-gray-900 px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
          >
            <span>{primaryAction.label}</span>
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  )
}
