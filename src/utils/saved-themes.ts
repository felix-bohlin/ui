import { readStored, writeStored } from "./storage"
import { migrateLegacy, normalizeTheme, themeStore, type Theme } from "./theme"

export type SavedTheme = Theme & { name: string }

const STORAGE_KEY = "opui-saved-themes"
const EVENT_NAME = "saved-themes:change"

const fingerprint = (theme: Theme) => JSON.stringify(normalizeTheme(theme))

const LEGACY_FIELDS: Record<string, string> = {
  "opui-custom-theme-dark": "dark",
  "opui-custom-theme-light": "light",
  "opui-example-theme": "example",
}

const toSaved = (entry: unknown) => {
  if (!entry || typeof entry !== "object") return null
  const { name, tokens } = entry as Record<string, unknown>
  if (typeof name !== "string" || name.trim() === "") return null
  if (tokens && typeof tokens === "object") {
    return { name, ...normalizeTheme(entry) }
  }
  const legacy = migrateLegacy(
    (key) => (entry as Record<string, unknown>)[LEGACY_FIELDS[key]] ?? null,
  )
  return legacy && { name, ...legacy }
}

const write = (themes: SavedTheme[]) => {
  writeStored(STORAGE_KEY, themes)
  document.dispatchEvent(new CustomEvent(EVENT_NAME))
}

export const savedThemes = {
  list(): SavedTheme[] {
    const themes = readStored<unknown>(STORAGE_KEY, [])
    return (Array.isArray(themes) ? themes : [])
      .map(toSaved)
      .filter((theme): theme is SavedTheme => theme !== null)
      .toSorted((a, b) => a.name.localeCompare(b.name))
  },

  current() {
    const current = fingerprint(themeStore.get())
    return (
      savedThemes.list().find((theme) => fingerprint(theme) === current)
        ?.name ?? null
    )
  },

  nextName() {
    const names = new Set(savedThemes.list().map((theme) => theme.name))
    let index = 1
    while (names.has(`Theme ${index}`)) index++
    return `Theme ${index}`
  },

  save(name: string) {
    write([
      ...savedThemes.list().filter((theme) => theme.name !== name),
      { name, ...themeStore.get() },
    ])
  },

  apply(name: string) {
    const theme = savedThemes.list().find((entry) => entry.name === name)
    if (theme) themeStore.set(theme)
  },

  remove(name: string) {
    write(savedThemes.list().filter((theme) => theme.name !== name))
  },

  subscribe(handler: () => void) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) handler()
    }
    document.addEventListener(EVENT_NAME, handler)
    window.addEventListener("storage", onStorage)
    const unsubscribe = themeStore.subscribe(handler)
    return () => {
      document.removeEventListener(EVENT_NAME, handler)
      window.removeEventListener("storage", onStorage)
      unsubscribe()
    }
  },
}
