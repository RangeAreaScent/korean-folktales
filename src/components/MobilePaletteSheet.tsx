"use client"

import { useEffect, useState } from "react"
import {
  hslToCss,
  PALETTE_THEMES,
  themeColors,
  type Hsl,
} from "@/lib/colors"
import { ColorPalette } from "./ColorPalette"
import type { FillMode } from "./ColoringCanvas"

type Props = {
  current: Hsl
  recent: Hsl[]
  fillMode: FillMode
  onPick: (color: Hsl) => void
  onFillModeChange: (mode: FillMode) => void
}

export function MobilePaletteSheet(props: Props) {
  const [open, setOpen] = useState(false)

  // Lock body scroll when expanded
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Esc closes the sheet
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Peek colors: prefer recent, fall back to first theme's first row
  const peekColors: Hsl[] =
    props.recent.length >= 6
      ? props.recent.slice(0, 6)
      : [
          ...props.recent,
          ...themeColors(PALETTE_THEMES[0]).slice(0, 6 - props.recent.length),
        ].slice(0, 6)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 max-h-[85vh] rounded-t-3xl bg-gradient-to-b from-amber-50/98 to-rose-50/95 shadow-2xl ring-1 ring-amber-100 transition-transform duration-300 ease-out lg:hidden"
        style={{
          transform: open ? "translateY(0)" : "translateY(calc(100% - 78px))",
        }}
      >
        {/* Peek bar — clickable to open */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full flex-col items-center px-4 pt-2.5"
          aria-label={open ? "Close palette" : "Open palette"}
        >
          <span className="h-1.5 w-10 rounded-full bg-gray-400/40 transition group-active:bg-gray-500/60" />
        </button>

        {/* Peek content (visible when collapsed) */}
        {!open && (
          <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-3">
            <div className="flex items-center gap-2">
              <div
                className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm"
                style={{ background: hslToCss(props.current) }}
              />
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              {peekColors.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    props.onPick(c)
                  }}
                  className="h-7 w-7 rounded-full ring-1 ring-gray-200/60 transition-transform active:scale-90"
                  style={{ background: hslToCss(c) }}
                  aria-label={`Pick color ${i + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="ml-1 grid h-7 w-7 place-items-center rounded-full bg-gray-900/85 text-white"
                aria-label="Open palette"
              >
                <span className="text-xs">▲</span>
              </button>
            </div>
          </div>
        )}

        {/* Expanded content */}
        {open && (
          <div
            className="overflow-y-auto px-3 pb-6"
            style={{ maxHeight: "calc(85vh - 40px)" }}
          >
            <ColorPalette {...props} />
          </div>
        )}
      </div>
    </>
  )
}
