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
  bgmOn: boolean
  toggleBgm: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = "coloring-storybook:muted"
const BGM_KEY = "coloring-storybook:bgm"

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(false)
  const [bgmOn, setBgmOn] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "true") setMutedState(true)
      if (window.localStorage.getItem(BGM_KEY) === "true") setBgmOn(true)
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

  useEffect(() => {
    if (bgmOn) sound.startBgm()
    else sound.stopBgm()
    try {
      window.localStorage.setItem(BGM_KEY, bgmOn ? "true" : "false")
    } catch {
      // ignore
    }
  }, [bgmOn])

  const toggle = useCallback(() => setMutedState((m) => !m), [])
  const setMuted = useCallback((m: boolean) => setMutedState(m), [])
  const toggleBgm = useCallback(() => setBgmOn((b) => !b), [])

  return (
    <SoundContext.Provider value={{ muted, toggle, setMuted, bgmOn, toggleBgm }}>
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
