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
}

export const BACKGROUNDS: PageBackground[] = [
  { name: "dancheong", from: "#f8ece7", to: "#e8bfae" },
  { name: "lantern", from: "#f3eef3", to: "#ddc9dd" },
  { name: "celadon", from: "#f1f5ee", to: "#d7e4d0" },
  { name: "persimmon", from: "#f8ede3", to: "#e8c39b" },
  { name: "amethyst", from: "#f6eef2", to: "#dcb8c8" },
  { name: "indigo-sky", from: "#eef2f6", to: "#cddce8" },
]

const BG_KEY = "coloring-storybook:bg"

/** Picks (or recalls) this session's background. SSR-safe: returns the
 *  first palette entry until the client-only effect resolves the real pick,
 *  so there's no hydration mismatch. */
export function useSessionBackground(): PageBackground {
  const [bg, setBg] = useState<PageBackground>(BACKGROUNDS[0])

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(BG_KEY)
      const found = BACKGROUNDS.find((b) => b.name === stored)
      if (found) {
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
