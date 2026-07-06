"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Locale = "ko" | "en"

export type Localized = {
  ko: string
  en: string
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (text: Localized) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = "coloring-storybook:locale"

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "ko" || stored === "en") return stored
  } catch {
    // ignore
  }
  if (navigator.language && navigator.language.toLowerCase().startsWith("ko")) {
    return "ko"
  }
  return "en"
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Initial state matches SSR ("en") to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("en")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Synchronizing with an external system (localStorage / navigator.language)
    // that isn't available during SSR — must run post-mount, so the one-time
    // extra render here is the intended hydration-safe tradeoff.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(detectInitialLocale())
    setHydrated(true)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (text: Localized) => text[locale],
    [locale],
  )

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t }}
    >
      <div lang={locale} data-hydrated={hydrated ? "true" : "false"}>
        {children}
      </div>
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>")
  }
  return ctx
}

/** Quick helper for tagging an inline pair. Useful in story content. */
export function L(ko: string, en: string): Localized {
  return { ko, en }
}
