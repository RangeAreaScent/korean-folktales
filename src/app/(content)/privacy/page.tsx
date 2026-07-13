"use client"

import Link from "next/link"
import { accentAlpha, useSessionBackground } from "@/lib/backgrounds"
import { useLocale } from "@/lib/i18n"

const LAST_UPDATED = "2026-07-02"

export default function PrivacyPage() {
  const { locale } = useLocale()
  const bg = useSessionBackground()

  return (
    <main
      className="min-h-screen px-6 py-14 md:py-20"
      style={{ background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})` }}
    >
      <article className="mx-auto max-w-2xl">
        <p
          className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.32em]"
          style={{ color: accentAlpha(bg.accent, 0.85) }}
        >
          {locale === "ko"
            ? "✦ 개인정보 처리방침 ✦"
            : "✦ Privacy Policy ✦"}
        </p>
        <h1
          className="mb-3 text-center font-display text-[34px] font-bold leading-tight text-gray-900 md:text-[44px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {locale === "ko"
            ? "개인정보 처리방침"
            : "Privacy Policy"}
        </h1>
        <p className="mb-10 text-center font-mono text-[11px] text-gray-500">
          {locale === "ko" ? "최근 업데이트" : "Last updated"} · {LAST_UPDATED}
        </p>

        <Section
          title={
            locale === "ko"
              ? "한 줄 요약"
              : "TL;DR"
          }
        >
          {locale === "ko"
            ? "이 사이트는 회원가입이 없고, 색칠 데이터와 갤러리는 사용자의 브라우저(localStorage) 안에만 저장됩니다. 다만 사이트 운영을 위해 Google AdSense 광고와 방문 통계 도구를 사용하며, 이들은 자체적으로 쿠키를 사용할 수 있습니다 — 자세한 내용은 아래 '제3자 도구' 항목을 확인해 주세요."
            : "There's no sign-up, and your coloring and gallery data stays on your device in your browser's localStorage. We do run Google AdSense ads and a visit-stats tool to support the site, which may set their own cookies — see 'Third-party services' below for details."}
        </Section>

        <Section
          title={
            locale === "ko" ? "수집하지 않는 정보" : "What we don't collect"
          }
        >
          <ul className="ml-5 list-disc space-y-2">
            <li>
              {locale === "ko"
                ? "이름, 이메일, 전화번호 등 식별 가능한 개인정보"
                : "Names, emails, phone numbers — no identifiers"}
            </li>
            <li>
              {locale === "ko"
                ? "위치 정보, 기기 ID, 광고 ID"
                : "Location, device IDs, advertising IDs"}
            </li>
            <li>
              {locale === "ko"
                ? "회원 계정 (회원가입 자체가 없음)"
                : "User accounts — there's no sign-up"}
            </li>
          </ul>
        </Section>

        <Section
          title={
            locale === "ko"
              ? "브라우저 안에 저장되는 것"
              : "What lives in your browser"
          }
        >
          <p className="mb-3">
            {locale === "ko"
              ? "다음 항목은 사용자의 브라우저 localStorage에 저장되며, 외부로 전송되지 않습니다. 브라우저 설정에서 언제든 지울 수 있습니다."
              : "These items are stored in your browser's localStorage only. They never leave your device. You can clear them anytime from your browser settings."}
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              {locale === "ko"
                ? "선택한 언어 (한/영)"
                : "Your language preference (Korean / English)"}
            </li>
            <li>
              {locale === "ko"
                ? "사운드 음소거 여부"
                : "Whether sound is on or off"}
            </li>
            <li>
              {locale === "ko"
                ? "완성한 그림책 갤러리 (최대 12권, 표지 이미지 + 메타데이터)"
                : "Your gallery of completed storybooks (up to 12, cover image + metadata)"}
            </li>
          </ul>
        </Section>

        <Section
          title={
            locale === "ko"
              ? "브라우저 기능 사용"
              : "Browser features we use"
          }
        >
          <ul className="ml-5 list-disc space-y-2">
            <li>
              {locale === "ko"
                ? "Web Audio API — 효과음을 사용자 브라우저에서 직접 생성합니다 (오디오 파일 다운로드 없음)"
                : "Web Audio API — sound effects are generated in your browser (no audio files downloaded)"}
            </li>
            <li>
              {locale === "ko"
                ? "Web Speech API — 한국어 단어 발음에 사용. 브라우저가 자체적으로 처리하며 우리는 텍스트를 전송하지 않습니다"
                : "Web Speech API — used to pronounce Korean words. Your browser handles this locally; we don't transmit the text"}
            </li>
            <li>
              {locale === "ko"
                ? "Web Share API — 완성한 그림책을 공유할 때 사용. 어떤 앱으로 공유할지는 사용자가 직접 선택합니다"
                : "Web Share API — used when you share a completed storybook. You choose where to share"}
            </li>
          </ul>
        </Section>

        <Section
          title={
            locale === "ko" ? "제3자 도구" : "Third-party services"
          }
        >
          <p className="mb-3">
            {locale === "ko"
              ? "사이트 운영 비용을 충당하기 위해 Google AdSense로 광고를 게재하며, 방문 통계를 위해 Vercel Analytics를 사용합니다. 두 서비스 모두 광고 개인화나 사용 패턴 분석을 위해 쿠키 또는 이와 유사한 기술을 사용할 수 있습니다."
              : "We show ads via Google AdSense to help cover hosting costs, and use Vercel Analytics to see basic visit statistics. Both may use cookies or similar technologies for ad personalization or usage analysis."}
          </p>
          <p>
            {locale === "ko"
              ? "Google의 광고 관련 개인정보 처리 방식은 Google 광고 정책 페이지에서 확인할 수 있으며, google.com/settings/ads 에서 맞춤 광고를 관리하거나 해제할 수 있습니다."
              : "You can learn how Google uses ad data at Google's Ads Privacy page, and manage or opt out of personalized ads at google.com/settings/ads."}
          </p>
        </Section>

        <Section
          title={
            locale === "ko" ? "어린이 개인정보" : "Children's privacy"
          }
        >
          <p>
            {locale === "ko"
              ? "이 사이트는 어린이가 편하게 이용할 수 있도록 만들어졌습니다. 어떤 정보도 수집하지 않기 때문에 13세 미만 어린이로부터 의도적으로든 비의도적으로든 개인정보를 수집할 일이 없습니다."
              : "This site is designed to be safe for children. Because we don't collect anything, we cannot knowingly or unknowingly collect personal information from children under 13."}
          </p>
        </Section>

        <Section title={locale === "ko" ? "문의" : "Contact"}>
          <p>
            {locale === "ko"
              ? "이 문서나 사이트에 대한 문의가 있다면 GitHub 저장소의 Issues로 연락해 주세요."
              : "Questions about this policy or the site? Please reach out via the GitHub repository's Issues."}
          </p>
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
            href="/about"
            className="underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            {locale === "ko" ? "소개" : "About"}
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
