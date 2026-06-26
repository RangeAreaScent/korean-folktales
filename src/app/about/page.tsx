"use client"

import Link from "next/link"
import { useLocale } from "@/lib/i18n"

export default function AboutPage() {
  const { locale } = useLocale()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafbfc] via-[#f3f5f7]/50 to-[#e7eaee] px-6 py-14 md:py-20">
      <article className="mx-auto max-w-2xl">
        <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-amber-700/80">
          {locale === "ko" ? "✦ 소개 ✦" : "✦ About ✦"}
        </p>
        <h1
          className="mb-10 text-center font-display text-[36px] font-bold leading-tight text-gray-900 md:text-[52px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {locale === "ko"
            ? "한국 전래동화 색칠 그림책"
            : "Korean Folktales · Coloring Storybook"}
        </h1>

        <Section title={locale === "ko" ? "이 사이트는" : "What this is"}>
          {locale === "ko"
            ? "한국의 옛이야기 여덟 편을 골라, 각자 다섯 장면씩 직접 색칠하고 분기를 선택해 나만의 그림책을 완성하는 무료 웹앱입니다. 한국어와 영어 두 언어를 모두 지원합니다."
            : "A free web app where you color each scene and pick your own branch through eight classic Korean folktales. Every story has five scenes and two endings. Bilingual: Korean and English."}
        </Section>

        <Section title={locale === "ko" ? "누구를 위해" : "Who it's for"}>
          {locale === "ko"
            ? "한국 옛이야기를 아이와 함께 보고 싶은 부모님, 한국어를 배우는 아이, K-콘텐츠를 좋아하는 가족 누구나. 4~10세 아이도 편하게 즐길 수 있도록 만들어졌어요."
            : "Parents who want to share Korean folktales with their kids, children learning Korean, and families who love K-content. Designed to feel friendly for ages 4–10."}
        </Section>

        <Section title={locale === "ko" ? "특징" : "What makes it different"}>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              {locale === "ko"
                ? "8개의 실제 한국 전래동화 (해님 달님, 흥부와 놀부, 별주부전 등)"
                : "Eight real Korean folktales (Sun and Moon, Heungbu and Nolbu, the Hare and the Dragon King, and more)"}
            </li>
            <li>
              {locale === "ko"
                ? "📖 원작 옛이야기 — 출처·줄거리·핵심 단어와 함께"
                : "📖 'About this folktale' — origin, summary, and key vocabulary"}
            </li>
            <li>
              {locale === "ko"
                ? "🔊 한국어 발음 — 화면 안에서 바로 들어볼 수 있어요"
                : "🔊 Korean pronunciation — tap any word to hear it"}
            </li>
            <li>
              {locale === "ko"
                ? "완성한 그림책은 PDF로 저장하거나 친구와 공유할 수 있어요"
                : "Save the finished storybook as a PDF or share it with friends"}
            </li>
          </ul>
        </Section>

        <Section title={locale === "ko" ? "사용 방법" : "How to use it"}>
          {locale === "ko"
            ? "이야기를 한 편 고르고, 장면을 클릭해서 색을 채우세요. 다 칠하면 다음 이야기를 골라 분기하고, 마지막 장면을 완성하면 PDF로 저장하거나 공유할 수 있어요. 회원가입은 없고, 모든 데이터는 사용자의 브라우저 안에만 보관됩니다."
            : "Pick a story, click on the regions to fill them with color, then choose your next branch. When the final scene is done, save the storybook as a PDF or share it. No sign-up. Everything stays on your device."}
        </Section>

        <Section title={locale === "ko" ? "기술" : "Technology"}>
          {locale === "ko"
            ? "Next.js · React · Tailwind 로 만들어졌어요. 사운드는 Web Audio API로 즉석 생성되고, 한글 발음은 브라우저의 Web Speech API를 사용합니다. 외부 서버에 어떤 정보도 보내지 않아요."
            : "Built with Next.js, React, and Tailwind. Sound effects are generated on the fly with the Web Audio API; Korean pronunciation uses your browser's Web Speech API. No data is sent to any server."}
        </Section>

        <div className="mt-12 text-center text-[12px] text-gray-500">
          <Link
            href="/"
            className="underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            {locale === "ko" ? "← 홈으로" : "← Back to home"}
          </Link>
          <span className="mx-3 text-gray-300">·</span>
          <Link
            href="/privacy"
            className="underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            {locale === "ko" ? "개인정보 처리방침" : "Privacy"}
          </Link>
        </div>
      </article>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <h2
        className="mb-3 font-display text-[20px] font-bold text-gray-900 md:text-[22px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed text-gray-700">
        {children}
      </div>
    </section>
  )
}
