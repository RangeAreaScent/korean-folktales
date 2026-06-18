"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ColoringCanvas,
  type ColoringCanvasHandle,
  type FillMode,
} from "@/components/ColoringCanvas"
import { ColorPalette } from "@/components/ColorPalette"
import { MobilePaletteSheet } from "@/components/MobilePaletteSheet"
import { OriginalTaleModal } from "@/components/OriginalTaleModal"
import { StoryPicker } from "@/components/StoryPicker"
import { PALETTE_THEMES, themeColors, type Hsl } from "@/lib/colors"
import { saveBook } from "@/lib/gallery"
import { useLocale, type Locale } from "@/lib/i18n"
import { sound } from "@/lib/sound"
import { UI } from "@/lib/strings"
import {
  getScene,
  getStory,
  type SceneId,
  type Story,
  type StoryId,
} from "@/lib/story"

const MAX_RECENT = 8
const FADE_MS = 200

type CompletedPage = {
  sceneId: SceneId
  dataUrl: string
  chosenLabel: { ko: string; en: string } | null
}

const INITIAL_COLOR: Hsl = themeColors(PALETTE_THEMES[0])[2]

export default function Home() {
  const { t, locale } = useLocale()
  const canvasRef = useRef<ColoringCanvasHandle>(null)
  const [storyId, setStoryId] = useState<StoryId | null>(null)
  const [history, setHistory] = useState<SceneId[]>([])
  const [completed, setCompleted] = useState<CompletedPage[]>([])
  const [color, setColor] = useState<Hsl>(INITIAL_COLOR)
  const [fillMode, setFillMode] = useState<FillMode>("solid")
  const [recent, setRecent] = useState<Hsl[]>([])
  const [showFinal, setShowFinal] = useState(false)
  const [finalImage, setFinalImage] = useState<string | null>(null)
  const [finalPagesCache, setFinalPagesCache] = useState<CompletedPage[]>([])
  const [hint, setHint] = useState<string | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [exporting, setExporting] = useState<null | "pdf" | "png" | "scene">(
    null,
  )
  const [showAbout, setShowAbout] = useState(false)
  const [finalPageIdx, setFinalPageIdx] = useState(0)

  const story = useMemo<Story | null>(
    () => (storyId ? getStory(storyId) : null),
    [storyId],
  )

  const currentSceneId =
    history.length > 0 ? history[history.length - 1] : null
  const currentScene = useMemo(
    () => (story && currentSceneId ? getScene(story.id, currentSceneId) : null),
    [story, currentSceneId],
  )

  const handlePickStory = useCallback((id: StoryId) => {
    const s = getStory(id)
    setStoryId(id)
    setHistory([s.startSceneId])
    setCompleted([])
    setShowFinal(false)
    setFinalImage(null)
    setFinalPagesCache([])
    setHint(null)
  }, [])

  const handlePick = useCallback((c: Hsl) => {
    setColor(c)
    setRecent((prev) => {
      const filtered = prev.filter(
        (p) =>
          !(
            Math.abs(p.h - c.h) < 1 &&
            Math.abs(p.s - c.s) < 1 &&
            Math.abs(p.l - c.l) < 1
          ),
      )
      return [c, ...filtered].slice(0, MAX_RECENT)
    })
  }, [])

  const handleChoice = useCallback(
    (nextId: SceneId) => {
      if (!currentScene || !currentSceneId) return
      const dataUrl = canvasRef.current?.toDataURL() ?? null
      const chosen = currentScene.choices?.find((c) => c.nextId === nextId)
      if (dataUrl) {
        setCompleted((prev) => [
          ...prev,
          {
            sceneId: currentSceneId,
            dataUrl,
            chosenLabel: chosen?.label ?? null,
          },
        ])
      }
      setHint(null)
      setTransitioning(true)
      sound.pageTurn()
      window.setTimeout(() => {
        setHistory((prev) => [...prev, nextId])
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTransitioning(false)),
        )
      }, FADE_MS)
    },
    [currentScene, currentSceneId],
  )

  const handleFinish = useCallback(async () => {
    if (!story || !currentSceneId) return
    const dataUrl = canvasRef.current?.toDataURL() ?? null
    const finalPages = dataUrl
      ? [
          ...completed,
          { sceneId: currentSceneId, dataUrl, chosenLabel: null },
        ]
      : completed

    setFinalPagesCache(finalPages)
    setCompleted(finalPages)
    setFinalPageIdx(0)

    // Build the 4:5 share-friendly cover image
    const shareImage = await generateShareImage(story, finalPages, locale)
    setFinalImage(shareImage)
    setShowFinal(true)
    sound.chime()

    // Save to gallery
    try {
      saveBook({
        storyId: story.id,
        shareImage,
        endingId: currentSceneId,
        locale,
      })
    } catch {
      // ignore — gallery save is best-effort
    }
  }, [story, completed, currentSceneId, locale])

  const handleBackToPicker = useCallback(() => {
    setStoryId(null)
    setHistory([])
    setCompleted([])
    setFinalPagesCache([])
    setShowFinal(false)
    setFinalImage(null)
    setHint(null)
    setColor(INITIAL_COLOR)
  }, [])

  const handleRestartStory = useCallback(() => {
    if (!story) return
    setHistory([story.startSceneId])
    setCompleted([])
    setFinalPagesCache([])
    setShowFinal(false)
    setFinalImage(null)
    setHint(null)
    setColor(INITIAL_COLOR)
    setTimeout(() => canvasRef.current?.reset(), 0)
  }, [story])

  const handleExportPdf = useCallback(async () => {
    if (exporting || !story) return
    setExporting("pdf")
    try {
      await exportStorybookPdf(story, finalPagesCache, locale)
    } finally {
      setExporting(null)
    }
  }, [exporting, story, finalPagesCache, locale])

  const handleShare = useCallback(async () => {
    if (exporting || !story || !finalImage) return
    setExporting("png")
    try {
      await shareOrDownload(finalImage, story, locale, `${story.id}-cover.png`)
    } finally {
      setExporting(null)
    }
  }, [exporting, story, finalImage, locale])

  const handleShareScene = useCallback(
    async (sceneIdx: number) => {
      if (exporting || !story) return
      const page = finalPagesCache[sceneIdx]
      if (!page) return
      setExporting("scene")
      try {
        const png = await generateScenePng(
          story,
          page,
          sceneIdx,
          finalPagesCache.length,
          locale,
        )
        await shareOrDownload(
          png,
          story,
          locale,
          `${story.id}-scene-${sceneIdx + 1}.png`,
        )
      } finally {
        setExporting(null)
      }
    },
    [exporting, story, finalPagesCache, locale],
  )

  // ─── Keyboard navigation in the flipbook ───
  const flipbookTotal = finalPagesCache.length + 1
  const goNextPage = useCallback(
    () => setFinalPageIdx((i) => Math.min(i + 1, flipbookTotal - 1)),
    [flipbookTotal],
  )
  const goPrevPage = useCallback(
    () => setFinalPageIdx((i) => Math.max(i - 1, 0)),
    [],
  )
  useEffect(() => {
    if (!showFinal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        goNextPage()
        sound.pageTurn()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrevPage()
        sound.pageTurn()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showFinal, goNextPage, goPrevPage])

  // ─── Story picker (no story selected yet) ───
  if (!story) {
    return <StoryPicker onPick={handlePickStory} />
  }

  // ─── Final / export view (flipbook carousel) ───
  if (showFinal && finalImage) {
    const isCoverPage = finalPageIdx === 0
    const currentSceneIdx = finalPageIdx - 1
    const currentPage =
      !isCoverPage && finalPagesCache[currentSceneIdx]
        ? finalPagesCache[currentSceneIdx]
        : null
    const currentSceneObj = currentPage
      ? getScene(story.id, currentPage.sceneId)
      : null

    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50/40 to-amber-50 p-4 md:p-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-amber-700/80">
            {t(UI.finalEyebrow)}
          </p>
          <h1
            className="mb-3 text-center font-display text-3xl font-bold leading-tight text-gray-900 md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t(UI.bookComplete)}
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600">
            {t(story.title)} — {t(story.subtitle)}
          </p>

          {/* Flipbook viewport */}
          <div className="relative">
            <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${finalPageIdx * 100}%)` }}
              >
                {/* Cover page */}
                <div className="w-full shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={finalImage}
                    alt={t(UI.bookComplete)}
                    className="block h-auto w-full"
                  />
                </div>
                {/* Scene pages */}
                {finalPagesCache.map((p, i) => {
                  const sc = getScene(story.id, p.sceneId)
                  return (
                    <div key={p.sceneId + i} className="w-full shrink-0">
                      <div className="flex aspect-[4/5] flex-col bg-gradient-to-b from-amber-50/40 to-white p-5">
                        <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700/80">
                          {i + 1} {t(UI.chapterPrefix)} / {finalPagesCache.length}
                        </p>
                        <h3
                          className="mb-3 text-center font-display text-lg font-bold leading-tight text-gray-900"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {t(sc.title).replace(
                            /^(?:Chapter\s*\d+\s*[—-]\s*|\d+장[^.]*\.\s*|Final\s*[—-]\s*|마지막 장\.\s*)/i,
                            "",
                          )}
                        </h3>
                        <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-amber-100 bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.dataUrl}
                            alt={t(sc.title)}
                            className="block h-full w-full object-contain"
                          />
                        </div>
                        <p className="mt-3 line-clamp-3 text-center font-serif text-[12px] leading-relaxed text-gray-700">
                          {t(sc.narration)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Left arrow */}
            <button
              type="button"
              onClick={() => {
                goPrevPage()
                sound.pageTurn()
              }}
              disabled={finalPageIdx === 0}
              aria-label={t(UI.prevPage)}
              className="absolute -left-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-amber-200 bg-white/95 text-xl text-gray-800 shadow-md backdrop-blur transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-30 md:-left-6"
            >
              ‹
            </button>
            {/* Right arrow */}
            <button
              type="button"
              onClick={() => {
                goNextPage()
                sound.pageTurn()
              }}
              disabled={finalPageIdx >= flipbookTotal - 1}
              aria-label={t(UI.nextPage)}
              className="absolute -right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-amber-200 bg-white/95 text-xl text-gray-800 shadow-md backdrop-blur transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-30 md:-right-6"
            >
              ›
            </button>
          </div>

          {/* Page indicator dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            {Array.from({ length: flipbookTotal }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (i !== finalPageIdx) {
                    setFinalPageIdx(i)
                    sound.pageTurn()
                  }
                }}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === finalPageIdx
                    ? "w-6 bg-amber-600"
                    : "w-2 bg-amber-300/60 hover:bg-amber-400"
                }`}
              />
            ))}
          </div>

          {/* Page label */}
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/70">
            {isCoverPage
              ? t(UI.coverLabel)
              : currentSceneObj
                ? `${currentSceneIdx + 1} / ${finalPagesCache.length}`
                : ""}
          </p>

          {/* Per-page share + global actions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={
                isCoverPage
                  ? handleShare
                  : () => handleShareScene(currentSceneIdx)
              }
              disabled={exporting !== null}
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60"
            >
              {exporting === "png" || exporting === "scene"
                ? t(UI.sharing)
                : isCoverPage
                  ? t(UI.shareCover)
                  : t(UI.shareThisScene)}
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={exporting !== null}
              className="rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 disabled:cursor-wait disabled:opacity-60"
            >
              {exporting === "pdf" ? t(UI.creatingPdf) : t(UI.savePdf)}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-gray-600">
            <button
              type="button"
              onClick={handleRestartStory}
              className="transition hover:text-gray-900 hover:underline"
            >
              {t(UI.colorAgain)}
            </button>
            <span className="text-gray-300">·</span>
            <button
              type="button"
              onClick={handleBackToPicker}
              className="transition hover:text-gray-900 hover:underline"
            >
              {t(UI.pickAnother)}
            </button>
          </div>
          <p className="mt-5 text-center text-[11px] text-gray-500">
            {t(UI.pdfNote)}
          </p>
        </div>
      </main>
    )
  }

  if (!currentScene) return null

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 via-rose-50/30 to-amber-50">
      {/* ─── Slim header ─── */}
      <header className="border-b border-amber-100/50 bg-white/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex items-baseline gap-3 overflow-hidden">
            <button
              type="button"
              onClick={handleBackToPicker}
              title={t(UI.backToLibrary)}
              className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-amber-700/80 transition hover:text-amber-900 sm:inline"
            >
              {story.emoji} {t(story.title)}
            </button>
            <span className="hidden text-gray-300 sm:inline">/</span>
            <h1
              className={`truncate font-serif text-base font-semibold text-gray-900 transition-opacity duration-200 md:text-lg ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {t(currentScene.title)}
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAbout(true)}
              title={t(UI.aboutThisTale)}
              className="hidden rounded-full bg-amber-100/60 px-3 py-1 text-[11px] font-medium text-amber-900 transition hover:bg-amber-100 sm:inline-flex"
            >
              📖
            </button>
            <span className="font-mono text-[11px] tabular-nums text-gray-500">
              {completed.length + 1} / {history.length}
            </span>
            <button
              type="button"
              onClick={handleRestartStory}
              title={t(UI.restartStory)}
              className="grid h-7 w-7 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="text-sm">↺</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main work area ─── */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-2 py-4 md:px-8 md:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div
            className={`flex flex-col items-center gap-5 transition-opacity duration-200 ease-out lg:items-stretch ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <ColoringCanvas
              ref={canvasRef}
              imageSrc={currentScene.image}
              fillColor={color}
              fillMode={fillMode}
              onError={(msg) => setHint(msg)}
            />

            {hint && (
              <p className="text-center text-[11px] text-amber-700/80">
                {hint}
              </p>
            )}

            <article className="w-full max-w-[720px] rounded-2xl border border-amber-100/80 bg-white/70 px-6 py-5 shadow-sm backdrop-blur">
              <p className="font-serif text-[17px] leading-relaxed text-gray-800">
                {t(currentScene.narration)}
              </p>
            </article>

            {currentScene.choices ? (
              <div className="grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2">
                {currentScene.choices.map((choice) => (
                  <button
                    key={choice.nextId}
                    type="button"
                    onClick={() => handleChoice(choice.nextId)}
                    disabled={transitioning}
                    className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-amber-100/80 bg-white/80 px-5 py-4 text-left text-base font-medium text-gray-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md disabled:cursor-wait disabled:opacity-60"
                  >
                    <span className="flex-1 leading-snug">
                      {t(choice.label)}
                    </span>
                    <span className="text-amber-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="w-full max-w-[720px] rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-rose-50 px-6 py-5 shadow-sm">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700">
                  {currentScene.endingLabel
                    ? t(currentScene.endingLabel)
                    : "Ending"}{" "}
                  · {t(UI.finalScene)}
                </p>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full rounded-full bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-gray-800"
                >
                  {t(UI.completeBook)}
                </button>
              </div>
            )}
          </div>

          <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
            <ColorPalette
              current={color}
              recent={recent}
              fillMode={fillMode}
              onPick={handlePick}
              onFillModeChange={setFillMode}
            />
          </aside>
        </div>
      </div>

      {/* Mobile bottom sheet palette */}
      <MobilePaletteSheet
        current={color}
        recent={recent}
        fillMode={fillMode}
        onPick={handlePick}
        onFillModeChange={setFillMode}
      />

      {/* Spacer so peek bar doesn't cover content on mobile */}
      <div className="h-20 lg:hidden" aria-hidden />

      <footer className="hidden border-t border-amber-100/50 bg-white/50 backdrop-blur-md md:block">
        <div className="mx-auto max-w-7xl px-5 py-2.5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-gray-500">
            <ShortcutHint k="⌘Z">{t(UI.scUndo)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="Shift +/−">{t(UI.scZoom)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="Shift 0">{t(UI.scZoom100)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="Space">{t(UI.scPan)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="F">{t(UI.scFullscreen)}</ShortcutHint>
          </div>
        </div>
      </footer>

      {showAbout && (
        <OriginalTaleModal
          story={story}
          onClose={() => setShowAbout(false)}
        />
      )}
    </main>
  )
}

function ShortcutHint({
  k,
  children,
}: {
  k: string
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <kbd className="rounded-md border border-gray-300/80 bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-gray-600 shadow-sm">
        {k}
      </kbd>
      <span>{children}</span>
    </span>
  )
}

function Sep() {
  return <span className="hidden text-gray-300 sm:inline">·</span>
}

// ──────────────────────────────────────────────────────────────
//  PDF export
// ──────────────────────────────────────────────────────────────

const PAGE_W = 780
const PAGE_H = 1102

function pageStyles(): string {
  return `
    width: ${PAGE_W}px;
    height: ${PAGE_H}px;
    background: #fffbf2;
    color: #1f2937;
    font-family: "Apple SD Gothic Neo", "Pretendard", Georgia, ui-serif, serif;
    box-sizing: border-box;
    padding: 70px 80px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  `
}

function coverPageHtml(story: Story, locale: Locale): string {
  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`
  return `
    <div style="${pageStyles()} justify-content: center; align-items: center; text-align: center;">
      <div style="
        font-size: 64px;
        margin-bottom: 32px;
        line-height: 1;
      ">${story.emoji}</div>
      <div style="
        font-size: 24px;
        letter-spacing: 0.3em;
        color: #b76d2a;
        margin-bottom: 28px;
      ">✦</div>
      <h1 style="
        font-size: 52px;
        font-weight: 700;
        margin: 0 0 24px;
        letter-spacing: -0.01em;
        line-height: 1.15;
      ">${escapeHtml(story.title[locale])}</h1>
      <p style="
        font-size: 22px;
        color: #6b5d4a;
        font-style: italic;
        margin: 0 0 60px;
        letter-spacing: 0.02em;
      ">${escapeHtml(story.subtitle[locale])}</p>
      <div style="
        width: 80px;
        height: 1px;
        background: #c2a37e;
        margin-bottom: 24px;
      "></div>
      <p style="
        font-size: 13px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        color: #9c8866;
        margin: 0;
        letter-spacing: 0.18em;
      ">A KOREAN FOLKTALE · ${dateStr}</p>
      <div style="
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 11px;
        color: #c2a37e;
        font-style: italic;
        letter-spacing: 0.08em;
      ">${escapeHtml(
        locale === "ko" ? "— 내가 색칠한 이야기 —" : "— My colored tale —",
      )}</div>
    </div>
  `
}

function scenePageHtml(opts: {
  chapterLabel: string
  sceneTitleClean: string
  imageDataUrl: string
  narration: string
  chosenLabel: string | null
  isEnding: boolean
  endingLabel?: string
  endText: string
}): string {
  const {
    chapterLabel,
    sceneTitleClean,
    imageDataUrl,
    narration,
    chosenLabel,
    isEnding,
    endingLabel,
    endText,
  } = opts

  const topLabel = isEnding
    ? `<div style="
        font-size: 11px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        color: #b76d2a;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        margin: 0 0 6px;
      ">${escapeHtml(endingLabel ?? "ENDING")}</div>`
    : `<div style="
        font-size: 11px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        color: #b76d2a;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        margin: 0 0 6px;
      ">${escapeHtml(chapterLabel)}</div>`

  const bottomEl = isEnding
    ? `<div style="
        text-align: center;
        font-size: 16px;
        font-style: italic;
        color: #9c8866;
        letter-spacing: 0.12em;
        margin-top: 28px;
      ">${escapeHtml(endText)}</div>`
    : chosenLabel
      ? `<div style="
          text-align: right;
          font-size: 14px;
          color: #b76d2a;
          font-style: italic;
          margin-top: 22px;
          letter-spacing: 0.01em;
        ">${escapeHtml(chosenLabel)} →</div>`
      : ""

  return `
    <div style="${pageStyles()}">
      ${topLabel}
      <h2 style="
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 24px;
        line-height: 1.2;
      ">${escapeHtml(sceneTitleClean)}</h2>

      <div style="
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 0;
      ">
        <div style="
          width: 100%;
          max-height: 100%;
          aspect-ratio: 1 / 1;
          background: #fff;
          border: 1px solid #f0e0c8;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 20px -10px rgba(120, 90, 50, 0.25);
        ">
          <img
            src="${imageDataUrl}"
            style="width: 100%; height: 100%; object-fit: contain; display: block;"
            alt=""
          />
        </div>
      </div>

      <div style="margin-top: 24px;">
        <p style="
          font-size: 16px;
          line-height: 1.75;
          color: #2c2520;
          margin: 0;
          font-family: Georgia, 'Apple SD Gothic Neo', 'Pretendard', ui-serif, serif;
          text-indent: 1em;
        ">${escapeHtml(narration)}</p>
        ${bottomEl}
      </div>
    </div>
  `
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// ──────────────────────────────────────────────────────────────
//  Share-friendly cover image (4:5 — Instagram feed)
// ──────────────────────────────────────────────────────────────

const SHARE_W = 1080
const SHARE_H = 1350

function firstSentence(text: string): string {
  const m = text.match(/^[^.!?。]+[.!?。]/)
  if (m) return m[0].trim()
  return text.length > 120 ? text.slice(0, 120).trim() + "…" : text
}

function shareCoverHtml(opts: {
  story: Story
  endingNarration: string
  endingLabel: string
  lastImage: string
  dateStr: string
  locale: Locale
}): string {
  const { story, endingNarration, endingLabel, lastImage, dateStr, locale } =
    opts
  const title = story.title[locale]
  const subtitle = story.subtitle[locale]
  return `
    <div style="
      width: ${SHARE_W}px;
      height: ${SHARE_H}px;
      background: linear-gradient(180deg, #fffaf1 0%, #fdf0e0 60%, #fbe7d4 100%);
      padding: 64px 64px 56px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-family: 'Gowun Batang', Georgia, 'Apple SD Gothic Neo', 'Pretendard', serif;
      color: #1f2937;
      position: relative;
      overflow: hidden;
    ">
      <div style="
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 22px;
        letter-spacing: 0.34em;
        color: #b76d2a;
        text-transform: uppercase;
        margin-bottom: 22px;
        text-align: center;
      ">✦ Korean Folktales ✦</div>

      <h1 style="
        font-family: 'Gowun Batang', Georgia, serif;
        font-size: 76px;
        font-weight: 700;
        line-height: 1.05;
        margin: 0 0 12px;
        letter-spacing: -0.01em;
        text-align: center;
      ">${escapeHtml(title)}</h1>

      <p style="
        font-family: 'Gowun Batang', Georgia, serif;
        font-size: 32px;
        font-style: italic;
        color: #6b5d4a;
        margin: 0 0 28px;
        text-align: center;
      ">${escapeHtml(subtitle)}</p>

      <div style="
        width: 760px;
        height: 760px;
        margin: 0 auto;
        background: white;
        border-radius: 14px;
        border: 1px solid #f0e0c8;
        overflow: hidden;
        box-shadow: 0 14px 36px -12px rgba(140, 100, 50, 0.28);
        flex-shrink: 0;
      ">
        <img
          src="${lastImage}"
          style="width:100%;height:100%;object-fit:contain;display:block;"
        />
      </div>

      <div style="margin: 26px 0 14px;">
        <p style="
          font-family: 'Gowun Batang', Georgia, serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1.5;
          color: #4a3a2a;
          margin: 0;
          text-align: center;
          padding: 0 24px;
        ">&ldquo;${escapeHtml(endingNarration)}&rdquo;</p>
      </div>

      <div style="flex: 1; min-height: 0;"></div>

      <div style="text-align: center;">
        <div style="
          display: inline-block;
          padding: 12px 28px;
          border: 1px solid #d4a76a;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 17px;
          letter-spacing: 0.2em;
          color: #b76d2a;
          background: rgba(255, 255, 255, 0.55);
        ">${escapeHtml(endingLabel)}</div>
      </div>

      <div style="
        margin-top: 18px;
        text-align: center;
        font-family: ui-monospace, monospace;
        font-size: 16px;
        letter-spacing: 0.18em;
        color: #9c8866;
      ">koreanfolktales.ink · ${dateStr}</div>
    </div>
  `
}

function sceneShareHtml(opts: {
  story: Story
  sceneTitle: string
  narration: string
  imageDataUrl: string
  chapterEyebrow: string
  dateStr: string
  locale: Locale
}): string {
  const { story, sceneTitle, narration, imageDataUrl, chapterEyebrow, dateStr, locale } = opts
  const trimmed = firstSentence(narration)
  return `
    <div style="
      width: ${SHARE_W}px;
      height: ${SHARE_H}px;
      background: linear-gradient(180deg, #fffaf1 0%, #fdf0e0 60%, #fbe7d4 100%);
      padding: 60px 64px 56px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-family: 'Gowun Batang', Georgia, 'Apple SD Gothic Neo', 'Pretendard', serif;
      color: #1f2937;
      position: relative;
      overflow: hidden;
    ">
      <div style="
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 14px;
        letter-spacing: 0.32em;
        color: #b76d2a;
        text-transform: uppercase;
        margin-bottom: 12px;
        text-align: center;
      ">${escapeHtml(chapterEyebrow)}</div>

      <h1 style="
        font-family: 'Gowun Batang', Georgia, serif;
        font-size: 54px;
        font-weight: 700;
        line-height: 1.1;
        margin: 0 0 26px;
        text-align: center;
        letter-spacing: -0.01em;
      ">${escapeHtml(sceneTitle)}</h1>

      <div style="
        width: 820px;
        height: 820px;
        margin: 0 auto;
        background: white;
        border-radius: 14px;
        border: 1px solid #f0e0c8;
        overflow: hidden;
        box-shadow: 0 14px 36px -12px rgba(140, 100, 50, 0.28);
        flex-shrink: 0;
      ">
        <img
          src="${imageDataUrl}"
          style="width:100%;height:100%;object-fit:contain;display:block;"
        />
      </div>

      <div style="margin-top: 26px; flex: 1; min-height: 0;">
        <p style="
          font-family: 'Gowun Batang', Georgia, serif;
          font-size: 20px;
          font-style: italic;
          line-height: 1.55;
          color: #4a3a2a;
          margin: 0;
          text-align: center;
          padding: 0 20px;
        ">&ldquo;${escapeHtml(trimmed)}&rdquo;</p>
      </div>

      <div style="
        text-align: center;
        font-family: 'Gowun Batang', Georgia, serif;
        font-size: 18px;
        color: #6b5d4a;
        margin-bottom: 8px;
      ">${escapeHtml(story.title[locale])}</div>
      <div style="
        text-align: center;
        font-family: ui-monospace, monospace;
        font-size: 13px;
        letter-spacing: 0.16em;
        color: #9c8866;
      ">koreanfolktales.ink · ${dateStr}</div>
    </div>
  `
}

async function generateShareImage(
  story: Story,
  pages: CompletedPage[],
  locale: Locale,
): Promise<string> {
  if (pages.length === 0) return ""
  const lastPage = pages[pages.length - 1]
  const endingScene = getScene(story.id, lastPage.sceneId)
  const endingNarration = firstSentence(endingScene.narration[locale])
  const endingLabel = endingScene.endingLabel?.[locale] ?? ""

  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`

  const html = shareCoverHtml({
    story,
    endingNarration,
    endingLabel,
    lastImage: lastPage.dataUrl,
    dateStr,
    locale,
  })

  const host = document.createElement("div")
  host.style.position = "fixed"
  host.style.left = "-99999px"
  host.style.top = "0"
  host.style.pointerEvents = "none"
  host.innerHTML = html
  document.body.appendChild(host)

  try {
    const node = host.firstElementChild as HTMLElement
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    )
    const { default: html2canvas } = await import("html2canvas")
    const canvas = await html2canvas(node, {
      scale: 1,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    })
    return canvas.toDataURL("image/png")
  } finally {
    document.body.removeChild(host)
  }
}

async function generateScenePng(
  story: Story,
  page: CompletedPage,
  pageIndex: number,
  totalPages: number,
  locale: Locale,
): Promise<string> {
  const scene = getScene(story.id, page.sceneId)
  const isEnding = !scene.choices
  const fullTitle = scene.title[locale]
  const sceneTitle = fullTitle.replace(
    /^(?:Chapter\s*\d+\s*[—-]\s*|\d+장[^.]*\.\s*|Final\s*[—-]\s*|마지막 장\.\s*)/i,
    "",
  )
  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`
  const chapterEyebrow = isEnding
    ? locale === "ko"
      ? "✦ 마지막 장 ✦"
      : "✦ Final Chapter ✦"
    : locale === "ko"
      ? `✦ ${pageIndex + 1}장 / ${totalPages}장 ✦`
      : `✦ Chapter ${pageIndex + 1} of ${totalPages} ✦`

  const html = sceneShareHtml({
    story,
    sceneTitle,
    narration: scene.narration[locale],
    imageDataUrl: page.dataUrl,
    chapterEyebrow,
    dateStr,
    locale,
  })

  const host = document.createElement("div")
  host.style.position = "fixed"
  host.style.left = "-99999px"
  host.style.top = "0"
  host.style.pointerEvents = "none"
  host.innerHTML = html
  document.body.appendChild(host)

  try {
    const node = host.firstElementChild as HTMLElement
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    )
    const { default: html2canvas } = await import("html2canvas")
    const canvas = await html2canvas(node, {
      scale: 1,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    })
    return canvas.toDataURL("image/png")
  } finally {
    document.body.removeChild(host)
  }
}

async function shareOrDownload(
  dataUrl: string,
  story: Story,
  locale: Locale,
  filenameOverride?: string,
): Promise<void> {
  const filename = filenameOverride ?? `${story.id}-storybook.png`
  // Try Web Share API (mobile-first)
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      const blob = await (await fetch(dataUrl)).blob()
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
      // user cancelled or share failed — fall through to download
    }
  }
  // Fallback: direct download
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

async function exportStorybookPdf(
  story: Story,
  pages: CompletedPage[],
  locale: Locale,
): Promise<void> {
  if (pages.length === 0) return
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ])

  const host = document.createElement("div")
  host.style.position = "fixed"
  host.style.left = "-99999px"
  host.style.top = "0"
  host.style.pointerEvents = "none"
  document.body.appendChild(host)

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  })
  const pdfW = 210
  const pdfH = 297

  async function addHtmlPage(html: string, isFirst: boolean) {
    host.innerHTML = html
    const node = host.firstElementChild as HTMLElement
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    )
    const canvas = await html2canvas(node, {
      scale: 2,
      backgroundColor: "#fffbf2",
      useCORS: true,
      logging: false,
    })
    const img = canvas.toDataURL("image/jpeg", 0.92)
    if (!isFirst) pdf.addPage()
    pdf.addImage(img, "JPEG", 0, 0, pdfW, pdfH)
  }

  const endText = locale === "ko" ? "— 끝 —" : "— The End —"

  try {
    await addHtmlPage(coverPageHtml(story, locale), true)

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i]
      const scene = getScene(story.id, p.sceneId)
      const isEnding = !scene.choices
      const fullTitle = scene.title[locale]
      const sceneTitleClean = fullTitle.replace(
        /^(?:Chapter\s*\d+\s*[—-]\s*|\d+장[^.]*\.\s*|Final\s*[—-]\s*|마지막 장\.\s*)/i,
        "",
      )
      const chapterLabel = isEnding
        ? locale === "ko"
          ? "마지막 장"
          : "FINAL CHAPTER"
        : locale === "ko"
          ? `${i + 1}장`
          : `CHAPTER ${i + 1}`
      await addHtmlPage(
        scenePageHtml({
          chapterLabel,
          sceneTitleClean,
          imageDataUrl: p.dataUrl,
          narration: scene.narration[locale],
          chosenLabel: p.chosenLabel?.[locale] ?? null,
          isEnding,
          endingLabel: scene.endingLabel?.[locale],
          endText,
        }),
        false,
      )
    }

    pdf.save(`${story.id}-storybook.pdf`)
  } finally {
    document.body.removeChild(host)
  }
}
