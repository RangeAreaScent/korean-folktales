"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useLocale } from "@/lib/i18n"
import { UI } from "@/lib/strings"
import { STORY_SLUGS, type Story } from "@/lib/story"

type Props = {
  story: Story
  onClose: () => void
  onStartColoring?: () => void
}

function speakKorean(text: string) {
  if (typeof window === "undefined") return
  if (!("speechSynthesis" in window)) return
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "ko-KR"
    utter.rate = 0.85
    utter.pitch = 1
    window.speechSynthesis.speak(utter)
  } catch {
    // ignore — Web Speech may be unavailable
  }
}

export function OriginalTaleModal({ story, onClose, onStartColoring }: Props) {
  const { t, locale } = useLocale()
  const tale = story.originalTale

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-gradient-to-b from-[#fafbfc]/98 to-[#e7eaee]/95 p-7 shadow-2xl ring-1 ring-gray-400 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t(UI.modalClose)}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-gray-600 transition hover:bg-amber-100/80 hover:text-gray-900"
        >
          <span className="text-xl leading-none">✕</span>
        </button>

        {/* Header */}
        <header className="mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700/80">
            {t(UI.modalEyebrow)}
          </p>
          <div className="flex items-baseline gap-3">
            <h2
              className="font-display text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tale.koreanTitle}
            </h2>
            <button
              type="button"
              onClick={() => speakKorean(tale.koreanTitle)}
              aria-label={`Play ${tale.koreanTitle}`}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/80 text-base text-amber-800 ring-1 ring-amber-200 transition hover:bg-white hover:text-amber-900"
            >
              🔊
            </button>
          </div>
          <p className="mt-1 font-mono text-sm italic text-amber-900/70">
            {tale.romanized}
          </p>
          <p className="mt-2 text-base text-gray-700">{tale.englishTitle}</p>
        </header>

        {/* The original tale — origin + summary combined (matches SEO page) */}
        <section className="mb-7 space-y-4">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700/80">
            {t(UI.modalOriginalTale)}
          </h3>
          <p className="text-[15px] leading-relaxed text-gray-800">
            {t(tale.origin)}
          </p>
          <p
            className="font-display text-[15px] leading-relaxed text-gray-800"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t(tale.summary)}
          </p>
        </section>

        {/* Korean words you'll meet */}
        <section className="mb-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700/80">
            {t(UI.modalKoreanWords)}
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tale.glossary.map((g) => (
              <li
                key={g.korean}
                className="rounded-2xl border border-gray-400 bg-white/70 px-4 py-3 backdrop-blur"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-display text-xl font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {g.korean}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakKorean(g.korean)}
                    aria-label={`Play ${g.korean}`}
                    className="grid h-6 w-6 place-items-center rounded-full text-sm text-amber-800/80 transition hover:bg-amber-50 hover:text-amber-900"
                  >
                    🔊
                  </button>
                  <span className="ml-auto font-mono text-[10px] italic text-amber-800/60">
                    {g.romanized}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[11px] text-gray-500">
                  {g.pronunciation}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-700">
                  {t(g.meaning)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Our version — small footer line, not a full section */}
        <p className="border-t border-gray-400 pt-4 text-[12px] leading-relaxed text-gray-600">
          <span className="font-semibold text-amber-800/80">
            {t(UI.modalOurVersion)} —{" "}
          </span>
          {t(tale.ourVersion)}
        </p>

        {/* CTAs */}
        {onStartColoring && (
          <div className="mt-6 flex flex-col items-center gap-3 border-t border-gray-400 pt-5">
            <button
              type="button"
              onClick={() => {
                onStartColoring()
                onClose()
              }}
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg sm:w-auto sm:px-8"
            >
              🎨 {locale === "ko" ? "이 이야기 색칠하기" : "Start coloring this folktale"}
            </button>
            <Link
              href={`/folktales/${STORY_SLUGS[story.id]}`}
              onClick={onClose}
              className="text-[12px] font-medium text-amber-900/60 underline-offset-4 transition hover:text-amber-900 hover:underline"
            >
              🔗 {locale === "ko" ? "공유용 페이지로 보기" : "View as shareable page"}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
