"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { sound } from "./sound"

type SoundContextValue = {
  muted: boolean
  toggle: () => void
  setMuted: (m: boolean) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = "coloring-storybook:muted"

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "true") setMutedState(true)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    sound.setMuted(muted)
    try {
      window.localStorage.setItem(STORAGE_KEY, muted ? "true" : "false")
    } catch {
      // ignore
    }
  }, [muted])

  const toggle = useCallback(() => setMutedState((m) => !m), [])
  const setMuted = useCallback((m: boolean) => setMutedState(m), [])

  return (
    <SoundContext.Provider value={{ muted, toggle, setMuted }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    throw new Error("useSound must be used inside <SoundProvider>")
  }
  return ctx
}
