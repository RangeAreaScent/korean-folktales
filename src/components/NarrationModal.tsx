"use client"

import { useEffect } from "react"
import { useLocale, type Localized } from "@/lib/i18n"
import { UI } from "@/lib/strings"
import { LocaleToggle } from "./LocaleToggle"

function speakKorean(text: string) {
  if (typeof window === "undefined") return
  if (!("speechSynthesis" in window)) return
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "ko-KR"
    utter.rate = 0.9
    utter.pitch = 1
    window.speechSynthesis.speak(utter)
  } catch {
    // ignore
  }
}

type Props = {
  open: boolean
  onClose: () => void
  sceneTitle: Localized
  narration: Localized
}

/**
 * Mobile-first scene narration modal. The full narrative would
 * crowd the canvas + palette below it on small screens, so the
 * narration moves into this modal and is opened on demand from
 * the control strip's 📖 button.
 */
export function NarrationModal({ open, onClose, sceneTitle, narration }: Props) {
  const { t } = useLocale()

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [open, onClose])

  if (!open) return null

  const paragraphs = t(narration)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="narration-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[80vh] sm:rounded-3xl"
      >
        {/* Drag handle (mobile bottom sheet feel) */}
        <div className="flex justify-center pt-2.5 sm:hidden">
          <span className="h-1.5 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between gap-3 border-b border-amber-100/70 px-5 pb-4 pt-3 sm:pt-5">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700">
              {t(UI.narrationModalTitle)}
            </p>
            <h2
              id="narration-modal-title"
              className="mt-1 truncate font-serif text-[17px] font-semibold text-gray-900 sm:text-lg"
            >
              {t(sceneTitle)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(UI.narrationClose)}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </header>

        {/* Narration body */}
        <div className="flex-1 space-y-3.5 overflow-y-auto px-5 py-5 font-serif text-[15.5px] leading-relaxed text-gray-800 sm:text-base">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Footer: language toggle (lives here on mobile so the control
             strip below the canvas can stay compact) + listen-in-Korean
             pronunciation button. */}
        <footer className="flex items-center justify-between gap-3 border-t border-amber-100/70 bg-gradient-to-b from-white to-amber-50/40 px-5 py-3.5">
          <LocaleToggle />
          <button
            type="button"
            onClick={() => speakKorean(narration.ko)}
            className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-[13px] font-medium text-amber-900 transition hover:bg-amber-200"
            aria-label={t(UI.narrationListen)}
          >
            {t(UI.narrationListen)}
          </button>
        </footer>
      </div>
    </div>
  )
}
