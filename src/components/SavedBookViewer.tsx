"use client"

import { useEffect } from "react"
import { useLocale } from "@/lib/i18n"
import { formatBookDate, type SavedBook } from "@/lib/gallery"
import { UI } from "@/lib/strings"
import { getStory } from "@/lib/story"

type Props = {
  book: SavedBook
  onClose: () => void
  onDelete: (id: string) => void
  onShare: (book: SavedBook) => void
}

export function SavedBookViewer({ book, onClose, onDelete, onShare }: Props) {
  const { t, locale } = useLocale()
  const story = getStory(book.storyId)
  const dateStr = formatBookDate(book.completedAt, locale)
  const endingScene = story.scenes[book.endingId]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  function handleDelete() {
    if (window.confirm(t(UI.bookDeleteConfirm))) {
      onDelete(book.id)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-gradient-to-b from-amber-50/98 to-rose-50/95 p-5 shadow-2xl ring-1 ring-amber-100 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t(UI.modalClose)}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-gray-700 transition hover:bg-white hover:text-gray-900"
        >
          <span className="text-xl leading-none">✕</span>
        </button>

        <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.shareImage}
            alt={story.title[locale]}
            className="block h-auto w-full"
          />
        </div>

        <div className="mt-4 px-1">
          <p
            className="font-display text-xl font-bold leading-tight text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {story.emoji} {story.title[locale]}
          </p>
          <p className="mt-0.5 text-[12px] text-gray-500">
            {endingScene?.endingLabel?.[locale] ?? ""} · {dateStr}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onShare(book)}
            className="flex-1 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
          >
            {t(UI.shareImage)}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-gray-300 px-4 py-2.5 text-[13px] font-medium text-gray-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
            aria-label={t(UI.bookDelete)}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}
