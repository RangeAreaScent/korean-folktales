"use client"

import { useSound } from "@/lib/sound-provider"

export function BgmToggle({
  className = "",
}: {
  className?: string
}) {
  const { bgmOn, toggleBgm } = useSound()
  return (
    <button
      type="button"
      onClick={toggleBgm}
      aria-label={bgmOn ? "Music on" : "Music off"}
      aria-pressed={bgmOn}
      title={bgmOn ? "Music on" : "Music off"}
      className={`grid h-9 w-9 place-items-center rounded-full border border-gray-400/60 bg-white/85 text-gray-700 shadow-sm backdrop-blur transition hover:bg-white ${className}`}
    >
      {/* Music note glyph — single eighth note (on) or note with slash (off) */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* Stem + filled note head */}
        <path d="M9 18 V6 l10 -2 v2" />
        <ellipse cx="7" cy="18" rx="2.5" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="17" cy="16" rx="2.5" ry="2" fill="currentColor" stroke="none" />
        {!bgmOn && (
          <path d="M4 4 L22 22" stroke="currentColor" strokeWidth="2" />
        )}
      </svg>
    </button>
  )
}
