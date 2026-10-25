import { readStored, writeStored } from "./storage"
import { themeStore, type ModeConfig, type ThemeSnapshot } from "./theme-store"

export type SavedTheme = ThemeSnapshot & { name: string }

export const PREVIOUS_THEME = "Previous theme"

const STORAGE_KEY = "opui-saved-themes"
const EVENT_NAME = "saved-themes:change"

const sortedEntries = (config: ModeConfig) =>
  Object.entries(config).toSorted(([a], [b]) => a.localeCompare(b))

const fingerprint = ({ dark, example, light }: ThemeSnapshot) =>
  JSON.stringify([sortedEntries(dark), example, sortedEntries(light)])

const write = (themes: SavedTheme[]) => {
  writeStored(STORAGE_KEY, themes)
  document.dispatchEvent(new CustomEvent(EVENT_NAME))
}

export const savedThemes = {
  list(): SavedTheme[] {
    const themes = readStored<unknown>(STORAGE_KEY, [])
    return (Array.isArray(themes) ? (themes as SavedTheme[]) : [])
      .filter((theme) => typeof theme?.name === "string")
      .toSorted((a, b) => a.name.localeCompare(b.name))
  },

  current(): string | null {
    const current = fingerprint(themeStore.snapshot())
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
      { name, ...themeStore.snapshot() },
    ])
  },

  apply(name: string): void {
    const theme = savedThemes.list().find((entry) => entry.name === name)
    if (theme) themeStore.load(theme)
  },

  remove(name: string): void {
    write(savedThemes.list().filter((theme) => theme.name !== name))
  },

  autosave(): void {
    const { dark, example, light } = themeStore.snapshot()
    const custom =
      example !== null ||
      Object.keys(dark).length > 0 ||
      Object.keys(light).length > 0
    if (custom && savedThemes.current() === null) {
      savedThemes.save(PREVIOUS_THEME)
    }
  },

  subscribe(handler: () => void): void {
    document.addEventListener(EVENT_NAME, handler)
    themeStore.subscribe(handler)
  },
}
