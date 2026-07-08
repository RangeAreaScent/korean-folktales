"use client"

import { useLocale } from "@/lib/i18n"
import { UI } from "@/lib/strings"
import { SoundToggle } from "./SoundToggle"
import { BgmToggle } from "./BgmToggle"

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

const GLASS =
  "bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"

/**
 * Floats OVER the bottom edge of the canvas (rendered as an absolutely-
 * positioned sibling inside the canvas's relative wrapper in page.tsx) so
 * the palette sheet can sit flush against the canvas below it — no separate
 * control-strip row eating vertical space. Mirrors iOS's floating glass
 * toolbar convention (e.g. Photos markup, Maps).
 */
export function MobileFloatingToolbar({
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
    <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-2 lg:hidden">
      {/* LEFT — undo · page indicator · erase, grouped in one glass capsule */}
      <div className={`pointer-events-auto flex items-center gap-0.5 rounded-full py-1 pl-1 pr-2 ${GLASS}`}>
        <button
          type="button"
          onClick={onUndo}
          disabled={!hasHistory}
          title={t(UI.ttUndo)}
          aria-label={t(UI.ttUndo)}
          className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-gray-800 transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H9" />
          </svg>
        </button>
        <span
          className="select-none px-1 font-mono text-[11px] tabular-nums text-gray-600"
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
            className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full transition active:scale-90 ${
              eraseActive ? "bg-gray-900 text-white" : "text-gray-800"
            }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M16 3l5 5L8 21H3v-5L16 3z" />
              <path d="M12 7l5 5" />
            </svg>
          </button>
        )}
      </div>

      {/* RIGHT — narration · sound · bgm (glass circles) + primary action
          (solid, so the main CTA keeps full contrast against the canvas) */}
      <div className="pointer-events-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={onOpenNarration}
          title={t(UI.ttStory)}
          aria-label={t(UI.ttStory)}
          className={`grid h-9 w-9 place-items-center rounded-full text-base transition active:scale-90 ${GLASS}`}
        >
          📖
        </button>
        <BgmToggle className={`${GLASS} !shadow-[0_1px_2px_rgba(0,0,0,0.08)]`} />
        <SoundToggle className={`${GLASS} !shadow-[0_1px_2px_rgba(0,0,0,0.08)]`} />
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            className="flex items-center gap-1 rounded-full bg-gray-900 px-3.5 py-2 text-[12.5px] font-medium text-white shadow-lg transition active:scale-95 disabled:cursor-wait disabled:opacity-60"
          >
            <span>{primaryAction.label}</span>
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  )
}
