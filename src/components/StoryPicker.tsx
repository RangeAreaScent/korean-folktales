"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useLocale } from "@/lib/i18n"
import {
  deleteBook,
  formatBookDate,
  listBooks,
  type SavedBook,
} from "@/lib/gallery"
import { UI } from "@/lib/strings"
import { getStory, STORY_LIST, type Story, type StoryId } from "@/lib/story"
import { OriginalTaleModal } from "./OriginalTaleModal"
import { SavedBookViewer } from "./SavedBookViewer"

type Props = {
  onPick: (id: StoryId) => void
}

export function StoryPicker({ onPick }: Props) {
  const { t, locale } = useLocale()
  const [aboutStory, setAboutStory] = useState<Story | null>(null)
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([])
  const [viewingBook, setViewingBook] = useState<SavedBook | null>(null)

  useEffect(() => {
    setSavedBooks(listBooks())
  }, [])

  const handleDelete = useCallback((id: string) => {
    deleteBook(id)
    setSavedBooks(listBooks())
  }, [])

  const handleShare = useCallback(
    async (book: SavedBook) => {
      const story = getStory(book.storyId)
      const filename = `${story.id}-storybook.png`
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          const blob = await (await fetch(book.shareImage)).blob()
          const file = new File([blob], filename, { type: "image/png" })
          const nav = navigator as Navigator & {
            canShare?: (data: { files: File[] }) => boolean
          }
          if (nav.canShare && nav.canShare({ files: [file] })) {
            await navigator.share({
              title: story.title[locale],
              text:
                locale === "ko"
                  ? "내가 색칠한 한국 옛이야기 그림책!"
                  : "I colored my own Korean folktale storybook!",
              files: [file],
            })
            return
          }
        } catch {
          // fall through
        }
      }
      const a = document.createElement("a")
      a.href = book.shareImage
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    [locale],
  )

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 via-rose-50/30 to-amber-50">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-12 md:py-16">
        <div className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-amber-700/80">
          <span className="h-px w-8 bg-amber-700/40" />
          {t(UI.brandTagline).replace(/^✦\s*|\s*✦$/g, "")}
          <span className="h-px w-8 bg-amber-700/40" />
        </div>
        <h1
          className="mb-5 text-center font-display text-[44px] font-bold leading-[1.05] text-gray-900 md:text-[64px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(UI.pickerTitle)}
        </h1>
        <p className="mb-3 max-w-2xl text-center text-[15px] font-medium leading-relaxed text-gray-800 md:text-[17px]">
          {t(UI.pickerSubtitle1)}
        </p>
        <p className="mb-7 max-w-xl text-center text-sm leading-relaxed text-gray-600 md:mb-8 md:text-base">
          {t(UI.pickerSubtitle2)}
        </p>

        {/* ─── Trust pills ─── */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:mb-14">
          <TrustPill icon="🆓">{t(UI.trustFree)}</TrustPill>
          <TrustPill icon="👶">{t(UI.trustNoSignup)}</TrustPill>
          <TrustPill icon="🌏">{t(UI.trustBilingual)}</TrustPill>
          <TrustPill icon="🖨️">{t(UI.trustPrintable)}</TrustPill>
        </div>

        {/* ─── Gallery (only when books saved) ─── */}
        {savedBooks.length > 0 && (
          <section className="mb-12 w-full">
            <div className="mb-4 flex items-baseline justify-between px-1">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-amber-800/80">
                {t(UI.galleryHeading)}
              </h2>
              <span className="text-[11px] text-gray-500">
                {savedBooks.length} · {t(UI.gallerySubhead)}
              </span>
            </div>
            <div className="-mx-1 flex gap-3 overflow-x-auto pb-3 pl-1 pr-1 md:gap-4">
              {savedBooks.map((book) => (
                <SavedBookThumb
                  key={book.id}
                  book={book}
                  onOpen={() => setViewingBook(book)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ─── Picker guide ─── */}
        <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/70">
          <span className="h-px w-6 bg-amber-700/30" />
          {t(UI.pickATale)}
          <span className="text-amber-700/60">↓</span>
        </div>

        {/* ─── Tales grid ─── */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {STORY_LIST.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onPick={() => onPick(story.id)}
              onAbout={() => setAboutStory(story)}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-[11px] text-gray-400">
          {t(UI.pickerMoreSoon)} · <span className="font-mono">v0.6</span>
        </p>
        <p className="mt-3 text-center text-[11px] text-gray-400">
          <Link
            href="/about"
            className="transition hover:text-gray-700 hover:underline"
          >
            {locale === "ko" ? "소개" : "About"}
          </Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link
            href="/privacy"
            className="transition hover:text-gray-700 hover:underline"
          >
            {locale === "ko" ? "개인정보 처리방침" : "Privacy"}
          </Link>
        </p>
      </div>

      {aboutStory && (
        <OriginalTaleModal
          story={aboutStory}
          onClose={() => setAboutStory(null)}
        />
      )}

      {viewingBook && (
        <SavedBookViewer
          book={viewingBook}
          onClose={() => setViewingBook(null)}
          onDelete={handleDelete}
          onShare={handleShare}
        />
      )}
    </main>
  )
}

function SavedBookThumb({
  book,
  onOpen,
}: {
  book: SavedBook
  onOpen: () => void
}) {
  const { locale } = useLocale()
  const story = getStory(book.storyId)
  const dateStr = formatBookDate(book.completedAt, locale)
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-[136px] shrink-0 flex-col overflow-hidden rounded-2xl border border-amber-100/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:w-[152px]"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-amber-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.shareImage}
          alt={story.title[locale]}
          className="block h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="px-2.5 py-2 text-left">
        <p className="truncate text-[12px] font-semibold text-gray-900">
          {story.emoji} {story.title[locale]}
        </p>
        <p className="font-mono text-[10px] text-gray-500">{dateStr}</p>
      </div>
    </button>
  )
}

function TrustPill({
  icon,
  children,
}: {
  icon: string
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-amber-900/80 shadow-sm backdrop-blur md:text-[13px]">
      <span aria-hidden>{icon}</span>
      {children}
    </span>
  )
}

function StoryCard({
  story,
  onPick,
  onAbout,
}: {
  story: Story
  onPick: () => void
  onAbout: () => void
}) {
  const { t } = useLocale()
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-amber-100/80 bg-gradient-to-br ${story.accent} p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg`}
    >
      <button
        type="button"
        onClick={onPick}
        className="absolute inset-0 z-10"
        aria-label={`${t(story.title)} — ${t(UI.startStory)}`}
      />

      <div className="relative z-20 flex items-start justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/coloring/icons/${story.id}.png`}
          alt=""
          aria-hidden
          width={96}
          height={96}
          className="h-24 w-24 object-contain drop-shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
        />
        <span className="rounded-full bg-white/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-800/80 backdrop-blur">
          {Object.keys(story.scenes).length} {t(UI.scenesSuffix)}
        </span>
      </div>

      <h2
        className="relative z-20 mt-5 font-display text-[22px] font-bold leading-tight text-gray-900 md:text-[26px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t(story.title)}
      </h2>
      <p
        className="relative z-20 mt-1 font-display text-[13px] italic text-gray-700 md:text-sm"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t(story.subtitle)}
      </p>

      <div className="relative z-20 my-4 h-px w-12 bg-amber-900/15" />

      <p className="relative z-20 text-[13px] leading-relaxed text-gray-700">
        {t(story.tagline)}
      </p>

      <div className="relative z-20 mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAbout()
          }}
          className="text-[11px] font-medium text-amber-900/60 transition hover:text-amber-900 hover:underline"
        >
          📖 {t(UI.aboutThisTale).replace("📖 ", "")}
        </button>
        <span className="flex items-center gap-1 rounded-full bg-gray-900/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition group-hover:bg-gray-900">
          {t(UI.startStory)}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </div>
  )
}
