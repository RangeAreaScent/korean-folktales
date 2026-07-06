import { useEffect, useState } from "react"

/**
 * Rotating page-background palette. One of these is picked at random per
 * browser session (persisted in sessionStorage) so repeat visits in the
 * same tab stay consistent, but a fresh visit gets a different mood.
 */
export type PageBackground = {
  name: string
  from: string
  to: string
  /** Accent color tuned to sit legibly on this palette's gradient — used
   *  for eyebrow labels, dividers, and trust pills so they read as
   *  designed-together instead of a leftover fixed amber. */
  accent: string
}

export const BACKGROUNDS: PageBackground[] = [
  { name: "dancheong", from: "#f8ece7", to: "#e8bfae", accent: "#a8543a" },
  { name: "lantern", from: "#f3eef3", to: "#ddc9dd", accent: "#8a5a86" },
  { name: "celadon", from: "#f1f5ee", to: "#d7e4d0", accent: "#5b7256" },
  { name: "persimmon", from: "#f8ede3", to: "#e8c39b", accent: "#a8663a" },
  { name: "amethyst", from: "#f6eef2", to: "#dcb8c8", accent: "#8a3f60" },
  { name: "indigo-sky", from: "#eef2f6", to: "#cddce8", accent: "#3f6688" },
]

/** Hex → rgba() string, for the partial-opacity accent uses (dividers,
 *  soft backgrounds) that Tailwind's color/opacity utilities can't express
 *  for a runtime-computed color. */
export function accentAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const BG_KEY = "coloring-storybook:bg"

/** Picks (or recalls) this session's background. SSR-safe: returns the
 *  first palette entry until the client-only effect resolves the real pick,
 *  so there's no hydration mismatch. */
export function useSessionBackground(): PageBackground {
  const [bg, setBg] = useState<PageBackground>(BACKGROUNDS[0])

  useEffect(() => {
    // Synchronizing with sessionStorage (unavailable during SSR) and, on a
    // fresh session, picking a random palette — neither can happen before
    // mount, so the one-time extra render here is the intended tradeoff.
    try {
      const stored = window.sessionStorage.getItem(BG_KEY)
      const found = BACKGROUNDS.find((b) => b.name === stored)
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBg(found)
        return
      }
    } catch {
      // ignore
    }
    const picked = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]
    setBg(picked)
    try {
      window.sessionStorage.setItem(BG_KEY, picked.name)
    } catch {
      // ignore
    }
  }, [])

  return bg
}
