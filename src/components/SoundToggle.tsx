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
      className={`grid h-8 w-8 place-items-center rounded-full border border-amber-100/80 bg-white/70 shadow-sm backdrop-blur transition hover:bg-white ${className}`}
    >
      <span className="text-base leading-none">{muted ? "🔇" : "🔊"}</span>
    </button>
  )
}
