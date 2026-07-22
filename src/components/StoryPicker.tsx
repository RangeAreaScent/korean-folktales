"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { accentAlpha, useSessionBackground } from "@/lib/backgrounds"
import { useLocale } from "@/lib/i18n"
import {
  deleteBook,
  formatBookDate,
  listBooks,
  type SavedBook,
} from "@/lib/gallery"
import { UI } from "@/lib/strings"
import {
  getStory,
  STORY_LIST,
  STORY_SLUGS,
  type Story,
  type StoryId,
} from "@/lib/story"
import { OriginalTaleModal } from "./OriginalTaleModal"
import { SavedBookViewer } from "./SavedBookViewer"

type Props = {
  onPick: (id: StoryId) => void
}

export function StoryPicker({ onPick }: Props) {
  const { t, locale } = useLocale()
  const bg = useSessionBackground()
  const [aboutStory, setAboutStory] = useState<Story | null>(null)
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([])
  const [viewingBook, setViewingBook] = useState<SavedBook | null>(null)

  useEffect(() => {
    // listBooks() reads localStorage, unavailable during SSR — must run
    // post-mount. Intentional one-time extra render on hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <main
      className="flex min-h-screen flex-col"
      style={{ background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})` }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-12 md:py-16">
        <div
          className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
          style={{ color: accentAlpha(bg.accent, 0.85) }}
        >
          <span
            className="h-px w-8"
            style={{ backgroundColor: accentAlpha(bg.accent, 0.4) }}
          />
          {t(UI.brandTagline).replace(/^✦\s*|\s*✦$/g, "")}
          <span
            className="h-px w-8"
            style={{ backgroundColor: accentAlpha(bg.accent, 0.4) }}
          />
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
          <TrustPill icon="🆓" accent={bg.accent}>{t(UI.trustFree)}</TrustPill>
          <TrustPill icon="👶" accent={bg.accent}>{t(UI.trustNoSignup)}</TrustPill>
          <TrustPill icon="🌏" accent={bg.accent}>{t(UI.trustBilingual)}</TrustPill>
          <TrustPill icon="🖨️" accent={bg.accent}>{t(UI.trustPrintable)}</TrustPill>
        </div>

        {/* ─── Gallery (only when books saved) ─── */}
        {savedBooks.length > 0 && (
          <section className="mb-12 w-full">
            <div className="mb-4 flex items-baseline justify-between px-1">
              <h2
                className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: accentAlpha(bg.accent, 0.85) }}
              >
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
        <div
          className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: accentAlpha(bg.accent, 0.7) }}
        >
          <span
            className="h-px w-6"
            style={{ backgroundColor: accentAlpha(bg.accent, 0.3) }}
          />
          {t(UI.pickATale)}
          <span style={{ color: accentAlpha(bg.accent, 0.6) }}>↓</span>
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

        {/* ─── Origins — real folklore content, always server-rendered
             (not gated behind a click/modal) so the picker screen reads
             as more than a pure navigation menu. §11 AdSense follow-up. ─── */}
        <section className="mt-16 w-full border-t border-gray-400/50 pt-12">
          <p
            className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: accentAlpha(bg.accent, 0.85) }}
          >
            {t(UI.originsEyebrow)}
          </p>
          <h2
            className="mb-3 text-center font-display text-2xl font-bold text-gray-900 md:text-[28px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t(UI.originsTitle)}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:text-base">
            {t(UI.originsIntro)}
          </p>
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
            {STORY_LIST.map((story) => (
              <OriginBlurb key={story.id} story={story} />
            ))}
          </div>
        </section>

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
          onStartColoring={() => onPick(aboutStory.id)}
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
      className="group flex w-[136px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-400/60 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:w-[152px]"
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

function OriginBlurb({ story }: { story: Story }) {
  const { t, locale } = useLocale()
  return (
    <article>
      <h3 className="flex items-baseline gap-2">
        <span
          className="font-display text-lg font-bold leading-tight text-gray-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(story.title)}
        </span>
        <span className="font-mono text-[11px] italic text-gray-500">
          {story.originalTale.koreanTitle} · {story.originalTale.romanized}
        </span>
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-gray-700 md:text-sm">
        {story.originalTale.origin[locale]}
      </p>
      <Link
        href={`/folktales/${STORY_SLUGS[story.id]}`}
        className="mt-2 inline-block text-[12px] font-medium text-amber-900/80 underline-offset-4 transition hover:text-amber-900 hover:underline"
      >
        {t(UI.originsReadMore)}
      </Link>
    </article>
  )
}

function TrustPill({
  icon,
  accent,
  children,
}: {
  icon: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-500/60 bg-white/70 px-3 py-1.5 text-[12px] font-medium shadow-sm backdrop-blur md:text-[13px]"
      style={{ color: accentAlpha(accent, 0.85) }}
    >
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
    // Outer wrapper — plain div with the card visual styling. The two
    // interactive areas (begin-story + about) are SIBLINGS rather than
    // nested, because mobile Safari refuses to fire the outer button's
    // click handler when an interactive descendant is present.
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-400/60 bg-gradient-to-br ${story.accent} p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg`}
    >
      {/* Primary tap target — covers the whole card except the About row */}
      <button
        type="button"
        onClick={onPick}
        aria-label={`${t(story.title)} — ${t(UI.startStory)}`}
        className="flex w-full flex-col text-left"
      >
        <div className="flex w-full items-start justify-between">
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
          className="mt-5 font-display text-[22px] font-bold leading-tight text-gray-900 md:text-[26px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(story.title)}
        </h2>
        <p
          className="mt-1 font-display text-[13px] italic text-gray-700 md:text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(story.subtitle)}
        </p>

        <div className="my-4 h-px w-12 bg-amber-900/15" />

        <p className="text-[13px] leading-relaxed text-gray-700">
          {t(story.tagline)}
        </p>
      </button>

      {/* About button — true sibling button, no nesting */}
      <button
        type="button"
        onClick={onAbout}
        className="mt-5 inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-gray-500/60 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-amber-900/80 shadow-sm backdrop-blur transition hover:border-amber-300 hover:bg-white hover:text-amber-900"
      >
        📖 {t(UI.aboutThisTale).replace("📖 ", "")}
      </button>
    </div>
  )
}
