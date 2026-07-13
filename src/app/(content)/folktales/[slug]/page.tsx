import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BackgroundShell } from "@/components/BackgroundShell"
import {
  getStoryBySlug,
  STORIES,
  STORY_LIST,
  STORY_SLUGS,
  type Story,
} from "@/lib/story"

const SITE_URL = "https://koreanfolktales.ink"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return Object.values(STORY_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return {}

  const title = `${story.title.en} (${story.originalTale.koreanTitle}) — Korean Folktale`
  const description = `${story.originalTale.summary.en.slice(0, 155)}…`
  const url = `${SITE_URL}/folktales/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Korean Folktales",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function FolktalePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  const otherStories = STORY_LIST.filter((s) => s.id !== story.id).slice(0, 4)

  return (
    <BackgroundShell className="min-h-screen px-5 py-12 md:py-16">
      <article className="mx-auto max-w-3xl">
        {/* ─── Hero ─── */}
        <p
          className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.32em]"
          style={{ color: "color-mix(in srgb, var(--accent) 85%, transparent)" }}
        >
          ✦ A Korean Folktale ✦
        </p>
        <h1
          className="mb-3 text-center font-display text-[40px] font-bold leading-[1.05] text-gray-900 md:text-[60px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {story.title.en}
        </h1>
        <p
          className="mb-2 text-center font-display text-xl italic text-gray-600 md:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {story.originalTale.koreanTitle}{" "}
          <span
            className="font-mono text-sm tracking-wide"
            style={{ color: "color-mix(in srgb, var(--accent) 70%, transparent)" }}
          >
            · {story.originalTale.romanized}
          </span>
        </p>
        <p className="mb-8 text-center text-sm text-gray-500 md:text-base">
          {story.subtitle.en}
        </p>

        <div className="mx-auto mb-10 flex h-44 w-44 items-center justify-center md:h-56 md:w-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/coloring/icons/${story.id}.png`}
            alt={`${story.title.en} line-art icon`}
            className="h-full w-full object-contain drop-shadow-sm"
            width={224}
            height={224}
          />
        </div>

        {/* ─── CTA top ─── */}
        <div className="mb-12 flex justify-center">
          <Link
            href={`/?start=${story.id}`}
            className="rounded-full bg-gray-900 px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
          >
            🎨 Start coloring this folktale →
          </Link>
        </div>

        {/* ─── The original tale (origin + summary combined, matches modal) ─── */}
        <Section
          eyebrow="The original tale"
          title={`The tale of ${story.title.en}`}
        >
          <p className="mb-4 text-[14px] leading-relaxed text-gray-700">
            {story.originalTale.origin.en}
          </p>
          <p
            className="font-display text-[15px] leading-relaxed text-gray-800"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {story.originalTale.summary.en}
          </p>
          <details className="mt-5 rounded-lg border border-gray-400/60 bg-white/60 p-4 text-[13px] text-gray-600">
            <summary
              className="cursor-pointer font-medium"
              style={{ color: "color-mix(in srgb, var(--accent) 90%, black)" }}
            >
              한국어로 읽기
            </summary>
            <p className="mt-3 leading-relaxed">
              {story.originalTale.origin.ko}
            </p>
            <p className="mt-3 leading-relaxed">
              {story.originalTale.summary.ko}
            </p>
          </details>
        </Section>

        {/* ─── Korean words you'll meet (matches modal) ─── */}
        <Section
          eyebrow="Korean words you'll meet"
          title={`Vocabulary from "${story.title.en}"`}
        >
          <ul className="grid gap-3 md:grid-cols-2">
            {story.originalTale.glossary.map((g) => (
              <li
                key={g.korean}
                className="rounded-2xl border border-gray-400/60 bg-white/70 p-4"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-xl font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {g.korean}
                  </span>
                  <span
                    className="ml-auto font-mono text-[10px] italic"
                    style={{ color: "color-mix(in srgb, var(--accent) 60%, black)" }}
                  >
                    {g.romanized}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[11px] text-gray-500">
                  {g.pronunciation}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-700">
                  {g.meaning.en}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── Our version (footer-style, matches modal) ─── */}
        <div className="border-t border-gray-400 pt-5">
          <p className="text-[13px] leading-relaxed text-gray-600">
            <span
              className="font-semibold"
              style={{ color: "color-mix(in srgb, var(--accent) 80%, black)" }}
            >
              Our version —{" "}
            </span>
            {story.originalTale.ourVersion.en}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-gray-500">
            <span
              className="font-semibold"
              style={{ color: "color-mix(in srgb, var(--accent) 60%, black)" }}
            >
              우리 버전 —{" "}
            </span>
            {story.originalTale.ourVersion.ko}
          </p>
        </div>

        {/* ─── CTA bottom ─── */}
        <div
          className="my-14 rounded-3xl border border-gray-400/50 p-8 text-center shadow-sm md:p-10"
          style={{ background: "linear-gradient(to bottom right, var(--bg-from), var(--bg-to))" }}
        >
          <h2
            className="mb-3 font-display text-2xl font-bold text-gray-900 md:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Color your way through {story.title.en}
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-gray-700 md:text-base">
            Free · bilingual · branching endings · no sign-up · printable PDF
            when you finish.
          </p>
          <Link
            href={`/?start=${story.id}`}
            className="inline-block rounded-full bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg"
          >
            🎨 Start coloring →
          </Link>
        </div>

        {/* ─── Other folktales ─── */}
        <section className="mt-16">
          <h2
            className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "color-mix(in srgb, var(--accent) 85%, transparent)" }}
          >
            ✦ Explore more Korean folktales ✦
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {otherStories.map((s) => (
              <li key={s.id}>
                <OtherStoryLink story={s} />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 text-center text-[12px] text-gray-500">
          <Link
            href="/"
            className="underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            ← Back to all folktales
          </Link>
        </div>
      </article>
    </BackgroundShell>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <p
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: "color-mix(in srgb, var(--accent) 70%, transparent)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="mb-4 font-display text-2xl font-bold text-gray-900 md:text-[28px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed text-gray-700 md:text-base">
        {children}
      </div>
    </section>
  )
}

function OtherStoryLink({ story }: { story: Story }) {
  return (
    <Link
      href={`/folktales/${STORY_SLUGS[story.id]}`}
      className={`flex flex-col items-center rounded-2xl border border-gray-400/60 bg-gradient-to-br ${story.accent} p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/coloring/icons/${story.id}.png`}
        alt=""
        aria-hidden
        width={64}
        height={64}
        className="h-16 w-16 object-contain"
      />
      <p
        className="mt-2 font-display text-[14px] font-bold leading-tight text-gray-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {story.title.en}
      </p>
    </Link>
  )
}

// Ensure unused STORIES import isn't shaken away (it's part of the public API)
void STORIES
