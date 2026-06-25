"use client"

import { useSound } from "@/lib/sound-provider"

export function SoundToggle({
  className = "",
}: {
  className?: string
}) {
  const { muted, toggle } = useSound()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Sound off" : "Sound on"}
      aria-pressed={!muted}
      className={`grid h-9 w-9 place-items-center rounded-full border border-amber-100/80 bg-white/85 text-gray-700 shadow-sm backdrop-blur transition hover:bg-white ${className}`}
    >
      {/* Flat minimal black-and-white speaker glyph (replaces the 🔊 / 🔇
          emoji which rendered in full color and clashed with the toolbar's
          neutral look). */}
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
        {/* Speaker body — same for both states */}
        <path d="M11 5 L6 9 H3 v6 h3 l5 4 z" />
        {muted ? (
          // Muted: a clean slash across the wave area
          <>
            <path d="M16 9 l5 6" />
            <path d="M21 9 l-5 6" />
          </>
        ) : (
          // Active: two gentle outward wave arcs
          <>
            <path d="M16 9 a5 5 0 0 1 0 6" />
            <path d="M18.5 6.5 a8.5 8.5 0 0 1 0 11" />
          </>
        )}
      </svg>
    </button>
  )
}
