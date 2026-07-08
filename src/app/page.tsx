"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ColoringCanvas,
  type ColoringCanvasHandle,
  type FillMode,
} from "@/components/ColoringCanvas"
import { ColorPalette } from "@/components/ColorPalette"
import { accentAlpha, useSessionBackground } from "@/lib/backgrounds"
import { DesktopControlBar } from "@/components/DesktopControlBar"
import { MobileFloatingToolbar } from "@/components/MobileFloatingToolbar"
import { MobilePaletteSheet } from "@/components/MobilePaletteSheet"
import { NarrationModal } from "@/components/NarrationModal"
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
  STORIES,
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
  const bg = useSessionBackground()
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
  const [transitioning, setTransitioning] = useState(false)
  const [exporting, setExporting] = useState<null | "pdf" | "png" | "scene">(
    null,
  )
  const [showAbout, setShowAbout] = useState(false)
  const [finalPageIdx, setFinalPageIdx] = useState(0)
  // Mobile control strip state — mirrored from ColoringCanvas via callbacks
  // so the strip can render zoom % + disabled undo state without owning the
  // canvas logic itself.
  const [canvasZoom, setCanvasZoom] = useState(1)
  const [canvasHasHistory, setCanvasHasHistory] = useState(false)
  const [showNarration, setShowNarration] = useState(false)
  // For branching scenes, choice cards stay hidden behind a "Continue"
  // button until the user is ready — reduces always-visible CTAs.
  const [showChoices, setShowChoices] = useState(false)
  const [eraseMode, setEraseMode] = useState(false)

  const toggleErase = useCallback(() => {
    setEraseMode((m) => {
      const next = !m
      canvasRef.current?.setEraseMode(next)
      return next
    })
  }, [])

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
  }, [])

  // Deep-link: /?start=<storyId> auto-picks the story (used by /folktales/[slug] CTAs)
  useEffect(() => {
    if (storyId) return
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const startParam = params.get("start")
    if (!startParam) return
    const candidate = STORIES[startParam as StoryId]
    if (!candidate) return
    // Reads window.location, unavailable during SSR — must run post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handlePickStory(candidate.id)
    const url = new URL(window.location.href)
    url.searchParams.delete("start")
    window.history.replaceState(null, "", url.pathname + url.search)
  }, [storyId, handlePickStory])

  // Auto-open the narration modal on mobile when a new scene appears, so
  // users discover the story text without hunting for the 📖 button.
  // Desktop already shows narration inline.
  useEffect(() => {
    if (!currentSceneId) return
    // Resets UI state for the new scene and, on mobile, checks matchMedia
    // (unavailable during SSR) to decide whether to auto-open narration —
    // both must run post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowChoices(false)
    if (typeof window === "undefined") return
    const isMobile = window.matchMedia("(max-width: 1023px)").matches
    if (isMobile) {
      setShowNarration(true)
    }
  }, [currentSceneId])

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
    setColor(INITIAL_COLOR)
  }, [])

  const handleRestartStory = useCallback(() => {
    if (!story) return
    // Confirm before destroying in-progress colorings — easy mis-tap target.
    if (typeof window !== "undefined") {
      const msg = t(UI.restartConfirm)
      if (!window.confirm(msg)) return
    }
    setHistory([story.startSceneId])
    setCompleted([])
    setFinalPagesCache([])
    setShowFinal(false)
    setFinalImage(null)
    setColor(INITIAL_COLOR)
    setTimeout(() => canvasRef.current?.reset(), 0)
  }, [story, t])

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
      <main
        className="min-h-screen p-4 md:p-10"
        style={{ background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})` }}
      >
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: accentAlpha(bg.accent, 0.85) }}
          >
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
            <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-400 bg-white shadow-2xl">
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
                      <div className="flex aspect-[4/5] flex-col bg-gradient-to-b from-[#fafbfc]/55 to-white p-5">
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
                        <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-gray-400 bg-white">
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
              className="absolute -left-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gray-500 bg-white/95 text-xl text-gray-800 shadow-md backdrop-blur transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-30 md:-left-6"
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
              className="absolute -right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gray-500 bg-white/95 text-xl text-gray-800 shadow-md backdrop-blur transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-30 md:-right-6"
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
    <main
      className="flex min-h-screen flex-col"
      style={{ background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})` }}
    >
      {/* ─── Slim header — tightened on mobile (smaller padding, page
            indicator moved into the MobileFloatingToolbar below the canvas) ─── */}
      <header className="border-b border-gray-400/40 bg-white/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 md:px-8 md:py-3">
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
              className={`truncate font-serif text-[15px] font-semibold text-gray-900 transition-opacity duration-200 md:text-lg ${
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
            {/* Page indicator desktop-only — on mobile it's in the
                MobileFloatingToolbar to keep the header a single tight row. */}
            <span className="hidden font-mono text-[11px] tabular-nums text-gray-500 sm:inline">
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

      {/* ─── Main work area — wider on desktop so the canvas owns more
            of the viewport instead of floating inside narrow margins ─── */}
      <div className="mx-auto w-full max-w-[1700px] px-2 pt-2 pb-0 md:px-6 md:py-6 lg:flex-1 lg:px-8">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,768px)_360px] lg:justify-center lg:gap-8">
          <div
            className={`flex flex-col items-center gap-2 transition-opacity duration-200 ease-out lg:items-stretch lg:gap-5 ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Canvas + floating glass toolbar (mobile only) — the toolbar
                is absolutely positioned over the canvas's bottom edge
                instead of consuming its own row, so the palette sheet can
                sit flush against the canvas below (iOS-native feel). */}
            <div className="relative w-full max-w-[768px]">
              <ColoringCanvas
                ref={canvasRef}
                imageSrc={currentScene.image}
                fillColor={color}
                fillMode={fillMode}
                hideToolbar
                onZoomChange={setCanvasZoom}
                onHistoryChange={setCanvasHasHistory}
              />
              <MobileFloatingToolbar
                hasHistory={canvasHasHistory}
                pageLabel={`${completed.length + 1} / ${history.length}`}
                eraseActive={eraseMode}
                primaryAction={
                  currentScene.choices
                    ? showChoices
                      ? null
                      : {
                          label: t(UI.makeAChoice),
                          onClick: () => setShowChoices(true),
                        }
                    : currentScene.nextId
                      ? {
                          label: t(UI.continueScene),
                          onClick: () => handleChoice(currentScene.nextId!),
                          disabled: transitioning,
                        }
                      : null
                }
                onUndo={() => canvasRef.current?.undo()}
                onErase={toggleErase}
                onOpenNarration={() => setShowNarration(true)}
              />
            </div>

            {/* Desktop control bar — directly below canvas */}
            <DesktopControlBar
              hasHistory={canvasHasHistory}
              zoom={canvasZoom}
              canZoomIn={canvasZoom < 8}
              canZoomOut={canvasZoom > 1}
              eraseActive={eraseMode}
              onUndo={() => canvasRef.current?.undo()}
              onZoomIn={() => canvasRef.current?.zoomBy(0.5)}
              onZoomOut={() => canvasRef.current?.zoomBy(-0.5)}
              onResetZoom={() => canvasRef.current?.resetZoom()}
              onToggleFullscreen={() => canvasRef.current?.toggleFullscreen()}
              onErase={toggleErase}
            />

            {/* Inline narration — DESKTOP ONLY. On mobile, narration lives
                in the NarrationModal opened by 📖 in MobileFloatingToolbar so
                the canvas + palette get full vertical space. */}
            <article className="hidden w-full max-w-[768px] overflow-hidden rounded-2xl border border-gray-400/60 bg-white/70 shadow-sm backdrop-blur lg:block">
              <div className="narration-scroll max-h-[36vh] space-y-3 overflow-y-auto px-6 py-5 font-serif text-[16px] leading-relaxed text-gray-800 md:text-[17px]">
                {t(currentScene.narration)
                  .split(/\n{2,}/)
                  .map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
              </div>
            </article>

            {currentScene.choices ? (
              showChoices ? (
                <div className="grid w-full max-w-[768px] grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentScene.choices.map((choice) => (
                    <button
                      key={choice.nextId}
                      type="button"
                      onClick={() => handleChoice(choice.nextId)}
                      disabled={transitioning}
                      className="group flex min-h-[64px] items-center gap-3 rounded-2xl border border-gray-400/60 bg-white/80 px-4 py-3 text-left text-[15px] font-medium text-gray-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md disabled:cursor-wait disabled:opacity-60"
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
                // Desktop fallback — on mobile the "Choose path" button
                // lives inside MobileFloatingToolbar so we don't render this row.
                <button
                  type="button"
                  onClick={() => setShowChoices(true)}
                  className="group hidden w-full max-w-[768px] items-center justify-center gap-2 rounded-full border border-gray-900/80 bg-white/85 px-5 py-2.5 text-[14px] font-medium text-gray-900 shadow-sm transition hover:bg-gray-900 hover:text-white lg:flex"
                >
                  <span>{t(UI.makeAChoice)}</span>
                </button>
              )
            ) : currentScene.nextId ? (
              // Desktop-only Continue button (mobile uses MobileFloatingToolbar).
              <button
                type="button"
                onClick={() => handleChoice(currentScene.nextId!)}
                disabled={transitioning}
                className="group hidden w-full max-w-[768px] items-center justify-center gap-2 rounded-full border border-gray-900/80 bg-white/85 px-5 py-2.5 text-[14px] font-medium text-gray-900 shadow-sm transition hover:bg-gray-900 hover:text-white disabled:cursor-wait disabled:opacity-60 lg:flex"
              >
                <span>{t(UI.continueScene)}</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <div
                className="w-full max-w-[768px] rounded-2xl border border-gray-500/60 px-6 py-5 shadow-sm"
                style={{ background: `linear-gradient(to bottom right, ${bg.from}, ${bg.to})` }}
              >
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

      {/* Mobile palette — always-visible panel below the control strip,
          choices area, etc. Sits inline (not fixed). */}
      <div className="px-2 lg:hidden">
        <MobilePaletteSheet
          current={color}
          recent={recent}
          fillMode={fillMode}
          onPick={handlePick}
          onFillModeChange={setFillMode}
        />
      </div>

      {/* Narration modal (mobile-only entry point; lives at root for layering) */}
      {currentScene && (
        <NarrationModal
          open={showNarration}
          onClose={() => setShowNarration(false)}
          sceneTitle={currentScene.title}
          narration={currentScene.narration}
        />
      )}

      <footer className="hidden border-t border-gray-400/40 bg-white/50 backdrop-blur-md md:block">
        <div className="mx-auto max-w-7xl px-5 py-2.5 md:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-gray-500">
            <ShortcutHint k="⌘Z">{t(UI.scUndo)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="+ / −">{t(UI.scZoom)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="0">{t(UI.scZoom100)}</ShortcutHint>
            <Sep />
            <ShortcutHint k="⌃ + Scroll">{t(UI.scPinch)}</ShortcutHint>
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

// US Letter portrait (8.5"×11" = 215.9×279.4 mm). Aspect = 0.7727.
const PAGE_W = 850
const PAGE_H = 1100
// Generous breathing room — ~25mm side, ~22mm top/bottom on Letter.
const PAGE_PAD_X = 100
const PAGE_PAD_Y = 80

function pageStyles(): string {
  return `
    width: ${PAGE_W}px;
    height: ${PAGE_H}px;
    background: #fffbf2;
    color: #1f2937;
    font-family: "Apple SD Gothic Neo", "Pretendard", Georgia, ui-serif, serif;
    box-sizing: border-box;
    padding: ${PAGE_PAD_Y}px ${PAGE_PAD_X}px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  `
}

// Narration pagination ─ paragraph-based split so V2.5 long narrations
// don't get silently clipped. First page hosts the image + a short
// chunk; continuation pages flow the rest with no image.
function paginateNarration(
  narration: string,
  locale: Locale,
): { hasImage: boolean; text: string }[] {
  const paragraphs = narration.split(/\n\n+/).filter((p) => p.trim().length > 0)
  // Tuned to current layout (image ~52% page height + 14px/13px narration).
  const firstPageLimit = locale === "ko" ? 520 : 980
  const continuationLimit = locale === "ko" ? 2200 : 4200

  const pages: { hasImage: boolean; text: string }[] = []
  let current: string[] = []
  let limit = firstPageLimit
  let isFirst = true

  const flush = () => {
    if (current.length === 0) return
    pages.push({ hasImage: isFirst, text: current.join("\n\n") })
    current = []
    isFirst = false
    limit = continuationLimit
  }

  for (const para of paragraphs) {
    const projected = current.length === 0 ? para : current.join("\n\n") + "\n\n" + para
    if (projected.length > limit && current.length > 0) {
      flush()
      current.push(para)
    } else {
      current.push(para)
    }
  }
  flush()

  if (pages.length === 0) {
    pages.push({ hasImage: true, text: narration })
  }

  return pages
}

async function imgUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error("read"))
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function coverPageHtml(
  story: Story,
  locale: Locale,
  iconDataUrl: string | null,
): string {
  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`

  const glossaryPreview = story.originalTale.glossary
    .slice(0, 2)
    .map(
      (g) => `
        <div style="
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px dashed #e0cfa8;
        ">
          <div style="flex: 0 0 auto; min-width: 90px; text-align: left;">
            <span style="
              font-size: 19px;
              color: #2c2520;
              font-weight: 600;
              letter-spacing: 0.01em;
            ">${escapeHtml(g.korean)}</span>
            <span style="
              font-size: 11px;
              font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
              color: #9c8866;
              margin-left: 8px;
              letter-spacing: 0.08em;
            ">${escapeHtml(g.romanized)}</span>
          </div>
          <div style="
            flex: 1;
            font-size: 13px;
            color: #6b5d4a;
            font-style: italic;
            line-height: 1.55;
            text-align: left;
          ">${escapeHtml(g.meaning[locale])}</div>
        </div>
      `,
    )
    .join("")

  const glossaryHeading = locale === "ko" ? "이 이야기 속 단어" : "Words from this tale"
  const originHeading = locale === "ko" ? "원작에 대하여" : "About the original tale"
  const folktaleLabel = locale === "ko" ? "한국 옛이야기" : "A KOREAN FOLKTALE"

  const iconBlock = iconDataUrl
    ? `<img src="${iconDataUrl}" alt="" style="
        width: 88px;
        height: 88px;
        object-fit: contain;
        display: block;
        margin: 0 auto 12px;
      " />`
    : `<div style="font-size: 56px; margin-bottom: 12px; line-height: 1;">${story.emoji}</div>`

  return `
    <div style="${pageStyles()} text-align: center; justify-content: space-between;">
      <!-- TOP: identity (icon + sparkle + KOREAN FOLKTALES eyebrow) -->
      <div>
        ${iconBlock}
        <div style="
          font-size: 11px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #b76d2a;
          letter-spacing: 0.32em;
          margin-bottom: 6px;
        ">✦ ${escapeHtml(folktaleLabel)} ✦</div>
      </div>

      <!-- MIDDLE-UPPER: title block -->
      <div>
        <h1 style="
          font-size: 44px;
          font-weight: 700;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
          line-height: 1.15;
        ">${escapeHtml(story.title[locale])}</h1>
        <p style="
          font-size: 19px;
          color: #6b5d4a;
          font-style: italic;
          margin: 0 0 22px;
          letter-spacing: 0.02em;
        ">${escapeHtml(story.subtitle[locale])}</p>
        <p style="
          font-size: 14.5px;
          color: #4a4036;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
          font-style: italic;
          font-family: Georgia, 'Apple SD Gothic Neo', 'Pretendard', ui-serif, serif;
        ">${escapeHtml(story.tagline[locale])}</p>
      </div>

      <!-- MIDDLE: divider + date -->
      <div>
        <div style="
          width: 60px;
          height: 1px;
          background: #c2a37e;
          margin: 0 auto 12px;
        "></div>
        <p style="
          font-size: 11px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #9c8866;
          margin: 0;
          letter-spacing: 0.2em;
        ">${dateStr}</p>
      </div>

      <!-- LOWER: glossary card -->
      <div style="
        background: rgba(255, 248, 232, 0.6);
        border: 1px solid #f0e0c8;
        border-radius: 10px;
        padding: 18px 22px;
        max-width: 520px;
        margin: 0 auto;
        text-align: left;
      ">
        <div style="
          font-size: 10.5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #b76d2a;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 6px;
        ">${escapeHtml(glossaryHeading)}</div>
        ${glossaryPreview}
      </div>

      <!-- LOWER: about original tale -->
      <div style="
        max-width: 520px;
        margin: 0 auto;
        text-align: left;
      ">
        <div style="
          font-size: 10.5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #b76d2a;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 6px;
        ">${escapeHtml(originHeading)}</div>
        <p style="
          font-size: 12.5px;
          color: #6b5d4a;
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        ">${escapeHtml(story.originalTale.origin[locale])}</p>
      </div>

      <!-- BOTTOM: tagline footer -->
      <div style="
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
  imageDataUrl: string | null
  narration: string
  chosenLabel: string | null
  isEnding: boolean
  endingLabel?: string
  endText: string
  isContinuation?: boolean
  continuationLabel?: string
  hasMore?: boolean
  moreLabel?: string
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
    isContinuation,
    continuationLabel,
    hasMore,
    moreLabel,
  } = opts

  const topLabelText = isContinuation
    ? (continuationLabel ?? "CONTINUED")
    : isEnding
      ? (endingLabel ?? "ENDING")
      : chapterLabel

  const topLabel = `<div style="
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #b76d2a;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin: 0 0 6px;
  ">${escapeHtml(topLabelText)}</div>`

  const continuedMore = hasMore
    ? `<div style="
        text-align: right;
        font-size: 12px;
        color: #b76d2a;
        font-style: italic;
        margin-top: 14px;
        letter-spacing: 0.04em;
      ">${escapeHtml(moreLabel ?? "continued…")}</div>`
    : ""

  const bottomEl = isEnding && !hasMore
    ? `<div style="
        text-align: center;
        font-size: 16px;
        font-style: italic;
        color: #9c8866;
        letter-spacing: 0.12em;
        margin-top: 28px;
      ">${escapeHtml(endText)}</div>`
    : !isEnding && chosenLabel && !hasMore
      ? `<div style="
          text-align: right;
          font-size: 14px;
          color: #b76d2a;
          font-style: italic;
          margin-top: 22px;
          letter-spacing: 0.01em;
        ">${escapeHtml(chosenLabel)} →</div>`
      : ""

  // Title only on first page of the scene; continuation pages skip it
  // so the narration breathes.
  const titleBlock = isContinuation
    ? ""
    : `<h2 style="
        font-size: 26px;
        font-weight: 700;
        margin: 0 0 20px;
        line-height: 1.2;
      ">${escapeHtml(sceneTitleClean)}</h2>`

  const imageBlock = imageDataUrl
    ? `<div style="
        flex: 0 1 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 0;
        overflow: hidden;
        margin-bottom: 20px;
      ">
        <div style="
          max-width: 100%;
          height: 480px;
          max-height: 480px;
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
      </div>`
    : ""

  return `
    <div style="${pageStyles()}">
      ${topLabel}
      ${titleBlock}
      ${imageBlock}

      <div style="flex: 1 1 auto; min-height: 0; overflow: hidden;">
        <p style="
          font-size: ${imageDataUrl ? 14 : 15}px;
          line-height: 1.75;
          color: #2c2520;
          margin: 0;
          font-family: Georgia, 'Apple SD Gothic Neo', 'Pretendard', ui-serif, serif;
          white-space: pre-wrap;
        ">${escapeHtml(narration)}</p>
        ${continuedMore}
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
  const isEnding = !!scene.endingLabel
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
    format: "letter",
    orientation: "portrait",
  })
  // US Letter: 8.5 × 11 inches = 215.9 × 279.4 mm
  const pdfW = 215.9
  const pdfH = 279.4

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
  const continuationLabel = locale === "ko" ? "이어서" : "CONTINUED"
  const moreLabel = locale === "ko" ? "다음 장에 계속…" : "continued on next page…"

  const iconDataUrl = await imgUrlToDataUrl(`/coloring/icons/${story.id}.png`)

  try {
    await addHtmlPage(coverPageHtml(story, locale, iconDataUrl), true)

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i]
      const scene = getScene(story.id, p.sceneId)
      const isEnding = !!scene.endingLabel
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

      const narrationPages = paginateNarration(scene.narration[locale], locale)
      for (let j = 0; j < narrationPages.length; j++) {
        const np = narrationPages[j]
        const hasMore = j < narrationPages.length - 1
        await addHtmlPage(
          scenePageHtml({
            chapterLabel,
            sceneTitleClean,
            imageDataUrl: np.hasImage ? p.dataUrl : null,
            narration: np.text,
            chosenLabel: p.chosenLabel?.[locale] ?? null,
            isEnding,
            endingLabel: scene.endingLabel?.[locale],
            endText,
            isContinuation: j > 0,
            continuationLabel,
            hasMore,
            moreLabel,
          }),
          false,
        )
      }
    }

    pdf.save(`${story.id}-storybook.pdf`)
  } finally {
    document.body.removeChild(host)
  }
}
