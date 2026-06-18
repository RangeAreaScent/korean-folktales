import type { Locale } from "./i18n"
import type { SceneId, StoryId } from "./story"

const STORAGE_KEY = "coloring-storybook:books:v1"
const MAX_BOOKS = 12

export type SavedBook = {
  id: string
  storyId: StoryId
  shareImage: string
  endingId: SceneId
  completedAt: number
  locale: Locale
}

function readAll(): SavedBook[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (b): b is SavedBook =>
        typeof b?.id === "string" &&
        typeof b?.storyId === "string" &&
        typeof b?.shareImage === "string" &&
        typeof b?.completedAt === "number",
    )
  } catch {
    return []
  }
}

function writeAll(books: SavedBook[]): boolean {
  if (typeof window === "undefined") return false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    return true
  } catch {
    // QuotaExceeded — drop oldest and retry once
    if (books.length > 1) {
      return writeAll(books.slice(0, -1))
    }
    return false
  }
}

export function saveBook(
  book: Omit<SavedBook, "id" | "completedAt">,
): SavedBook {
  const all = readAll()
  const newBook: SavedBook = {
    ...book,
    id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    completedAt: Date.now(),
  }
  const updated = [newBook, ...all].slice(0, MAX_BOOKS)
  writeAll(updated)
  return newBook
}

export function listBooks(): SavedBook[] {
  return readAll()
}

export function deleteBook(id: string): void {
  const all = readAll()
  writeAll(all.filter((b) => b.id !== id))
}

export function formatBookDate(timestamp: number, locale: Locale): string {
  const d = new Date(timestamp)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  if (locale === "ko") return `${y}.${m}.${day}`
  // English: "Jun 18, 2026"
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
