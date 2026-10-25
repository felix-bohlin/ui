import { readStored, writeStored } from "./storage"
import { normalizeTheme, themeStore, type Theme } from "./theme"

export type SavedTheme = Theme & { name: string }

const STORAGE_KEY = "opui-saved-themes"
const EVENT_NAME = "saved-themes:change"

const fingerprint = (theme: Theme) => JSON.stringify(normalizeTheme(theme))

const write = (themes: SavedTheme[]) => {
  writeStored(STORAGE_KEY, themes)
  document.dispatchEvent(new CustomEvent(EVENT_NAME))
}

export const savedThemes = {
  list(): SavedTheme[] {
    const themes = readStored<unknown>(STORAGE_KEY, [])
    return (Array.isArray(themes) ? themes : [])
      .filter(
        (theme): theme is SavedTheme =>
          typeof theme?.name === "string" &&
          theme.name.trim() !== "" &&
          typeof theme.tokens === "object" &&
          theme.tokens !== null,
      )
      .map((theme) => ({ name: theme.name, ...normalizeTheme(theme) }))
      .toSorted((a, b) => a.name.localeCompare(b.name))
  },

  current(): string | null {
    const current = fingerprint(themeStore.get())
    return (
      savedThemes.list().find((theme) => fingerprint(theme) === current)
        ?.name ?? null
    )
  },

  nextName(): string {
    const names = new Set(savedThemes.list().map((theme) => theme.name))
    let index = 1
    while (names.has(`Theme ${index}`)) index++
    return `Theme ${index}`
  },

  save(name: string): void {
    write([
      ...savedThemes.list().filter((theme) => theme.name !== name),
      { name, ...themeStore.get() },
    ])
  },

  apply(name: string): void {
    const theme = savedThemes.list().find((entry) => entry.name === name)
    if (theme) themeStore.set(theme)
  },

  remove(name: string): void {
    write(savedThemes.list().filter((theme) => theme.name !== name))
  },

  subscribe(handler: () => void): () => void {
    document.addEventListener(EVENT_NAME, handler)
    const unsubscribe = themeStore.subscribe(handler)
    return () => {
      document.removeEventListener(EVENT_NAME, handler)
      unsubscribe()
    }
  },
}
