"use client"

import type { CSSProperties, ReactNode } from "react"
import { useSessionBackground } from "@/lib/backgrounds"

/**
 * Wraps a server-rendered page in the session's rotating background.
 * Needed because the folktale SEO pages are async Server Components (for
 * generateStaticParams/generateMetadata) and can't call the background hook
 * directly. Exposes the picked colors as CSS custom properties so server-
 * rendered descendants can reference them in plain inline styles —
 * `var(--accent)` / `var(--bg-from)` / `var(--bg-to)` cascade through the
 * DOM regardless of the client/server component boundary.
 */
export function BackgroundShell({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const bg = useSessionBackground()
  const style: CSSProperties & Record<string, string> = {
    background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})`,
    "--accent": bg.accent,
    "--bg-from": bg.from,
    "--bg-to": bg.to,
  }
  return (
    <main className={className} style={style}>
      {children}
    </main>
  )
}
