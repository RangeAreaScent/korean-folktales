"use client"

import { useLocale, type Locale } from "@/lib/i18n"

export function LocaleToggle({
  className = "",
}: {
  className?: string
}) {
  const { locale, setLocale } = useLocale()

  const options: { id: Locale; label: string }[] = [
    { id: "ko", label: "한글" },
    { id: "en", label: "ENG" },
  ]

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-amber-100/80 bg-white/70 p-1 shadow-sm backdrop-blur ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setLocale(o.id)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
            locale === o.id
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
          aria-pressed={locale === o.id}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
