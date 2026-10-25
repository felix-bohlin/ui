/**
 * Single source of truth for the user-tweakable theme tokens.
 *
 * Both ThemeConfigurator (the global drawer) and the theme-generator page
 * route every read/write through this module. The store:
 *  - Persists per-mode JSON to localStorage under `opui-custom-theme-{light|dark}`
 *    (same keys the inline bootstrap in ThemeBootstrap.astro reads on first paint).
 *  - Applies tokens to <html> when the edited mode matches the active site mode,
 *    so the docs chrome reflects edits live.
 *  - Emits a `theme:change` CustomEvent on `document` so any subscribed UI
 *    (the drawer, the generator page) re-syncs without DOM-bridging hacks.
 *
 * Boolean-ish settings (enable-grays) are stored as the string
 * "true"/"false" to stay byte-compatible with previously-saved configs.
 */

import { exampleTheme } from "./example-themes"
import { removeStored, writeStored } from "./storage"
import { themeTokens } from "./theme-tokens"

export type Mode = "light" | "dark"

export type Token =
  | "--ui-palette-hue"
  | "--ui-palette-chroma"
  | "--ui-palette-hue-rotate-by"
  | "--ui-gray-chroma"
  | "--ui-gray-hue"
  | "--ui-radius"
  | "--ui-field-radius"
  | "--ui-button-radius"
  | "--ui-chip-radius"
  | "--ui-dialog-radius"
  | "--ui-menu-radius"
  | "--ui-button-hover"

export const TOKENS = [
  "--ui-palette-hue",
  "--ui-palette-chroma",
  "--ui-palette-hue-rotate-by",
  "--ui-gray-chroma",
  "--ui-gray-hue",
  "--ui-radius",
  "--ui-field-radius",
  "--ui-button-radius",
  "--ui-chip-radius",
  "--ui-dialog-radius",
  "--ui-menu-radius",
  "--ui-button-hover",
] as const satisfies readonly Token[]

// Defaults must mirror what `packages/opui/css/theme.css` ships
// so the configurators (drawer + generator) reflect the live site palette
// before the user has tweaked anything. theme.css sets --ui-palette-hue to
// 145 (green) in both color schemes.
const THEME_TOKENS = themeTokens()

const TOKEN_DEFAULTS_BY_MODE: Record<Mode, Record<Token, string>> = {
  dark: {} as Record<Token, string>,
  light: {} as Record<Token, string>,
}

for (const token of TOKENS) {
  const declared = THEME_TOKENS.find((candidate) => candidate.name === token)
  if (!declared) throw new Error(`${token} is not declared in theme.css`)
  TOKEN_DEFAULTS_BY_MODE.light[token] = declared.value
  TOKEN_DEFAULTS_BY_MODE.dark[token] = declared.dark ?? declared.value
}

export const THEME_KEYS = {
  contrast: "contrast",
  customTheme: "opui-custom-theme",
  exampleTheme: "opui-example-theme",
  theme: "theme",
}

export function tokenDefaults(mode: Mode): Record<Token, string> {
  return TOKEN_DEFAULTS_BY_MODE[mode]
}

export const RADIUS_OPTIONS = [
  { text: "0", value: "0" },
  { text: "1", value: "0.25rem" },
  { text: "2", value: "0.5rem" },
  { text: "3", value: "1rem" },
  { text: "4", value: "1.25rem" },
]

export const BUTTON_HOVER_OPTIONS = [
  { text: "Shade", value: "shade" },
  { text: "Layer", value: "layer" },
]

export const radiusOptions = (token: Token) =>
  token === "--ui-radius"
    ? RADIUS_OPTIONS
    : [{ text: "Auto", value: "var(--ui-radius)" }, ...RADIUS_OPTIONS]

export type ModeConfig = Partial<Record<Token, string>> & {
  "enable-grays"?: "true" | "false"
}

export type ChangeType =
  "set" | "reset" | "applyMode" | "enable-grays" | "example-theme"

export type ThemeChangeDetail = {
  mode: Mode
  type: ChangeType
  token?: Token
  value?: string
}

const EVENT_NAME = "theme:change"
const STORAGE_KEY = (mode: Mode) => `${THEME_KEYS.customTheme}-${mode}`
const isBrowser = typeof window !== "undefined"

function readConfig(mode: Mode): ModeConfig {
  if (!isBrowser) return {}
  return window.themeUtils.getCustomTheme(mode)
}

function writeConfig(mode: Mode, config: ModeConfig): void {
  if (!isBrowser) return
  writeStored(STORAGE_KEY(mode), config)
}

function emit(detail: ThemeChangeDetail): void {
  if (!isBrowser) return
  document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }))
}

function getExampleTheme(): string | null {
  if (!isBrowser) return null
  return window.themeUtils.getExampleTheme()
}

export const withExampleTheme = (
  defaults: Record<Token, string>,
  name: string | null,
) => {
  const tokens = exampleTheme(name)?.tokens ?? {}
  return Object.fromEntries(
    TOKENS.map((token) => [token, tokens[token] ?? defaults[token]]),
  ) as Record<Token, string>
}

function getActiveSiteMode(): Mode {
  if (!isBrowser) return "light"
  return document.documentElement.classList.contains("ui-dark")
    ? "dark"
    : "light"
}

export const themeStore = {
  get(mode: Mode): ModeConfig {
    return readConfig(mode)
  },

  getActiveSiteMode,

  /** The defaults for `mode`, with the example theme's values on top. */
  defaults(mode: Mode): Record<Token, string> {
    return withExampleTheme(tokenDefaults(mode), getExampleTheme())
  },

  /** Resolve a token's effective value for `mode`, falling back to the default. */
  effective(mode: Mode, token: Token): string {
    return readConfig(mode)[token] ?? themeStore.defaults(mode)[token]
  },

  getExampleTheme,

  setExampleTheme(name: string | null): void {
    if (!isBrowser) return
    window.themeUtils.setExampleTheme(name)
    emit({
      mode: getActiveSiteMode(),
      type: "example-theme",
      value: name ?? undefined,
    })
  },

  isGraysEnabled(mode: Mode): boolean {
    return readConfig(mode)["enable-grays"] !== "false"
  },

  setToken(mode: Mode, token: Token, value: string): void {
    const config = readConfig(mode)
    config[token] = value
    writeConfig(mode, config)
    if (isBrowser && mode === getActiveSiteMode()) {
      document.documentElement.style.setProperty(token, value)
    }
    emit({ mode, type: "set", token, value })
  },

  setEnableGrays(mode: Mode, enabled: boolean): void {
    const config = readConfig(mode)
    config["enable-grays"] = enabled ? "true" : "false"
    writeConfig(mode, config)
    if (isBrowser && mode === getActiveSiteMode()) {
      document.documentElement.classList.toggle("no-grays", !enabled)
    }
    emit({
      mode,
      type: "enable-grays",
      value: enabled ? "true" : "false",
    })
  },

  /**
   * Re-applies the saved config for `mode` to <html> with ThemeBootstrap.astro's
   * bootstrap, so toggling the global theme and switching configs always
   * lands in a consistent state.
   */
  applyMode(mode: Mode = getActiveSiteMode()): void {
    if (!isBrowser) return
    window.themeUtils.applyCustomTheme(mode)
    emit({ mode, type: "applyMode" })
  },

  reset(): void {
    if (!isBrowser) return
    removeStored(STORAGE_KEY("light"))
    removeStored(STORAGE_KEY("dark"))
    removeStored(THEME_KEYS.customTheme) // legacy
    window.themeUtils.setExampleTheme(null)

    window.themeUtils.applyCustomTheme()

    emit({ mode: getActiveSiteMode(), type: "reset" })
  },

  subscribe(handler: (detail: ThemeChangeDetail) => void): () => void {
    if (!isBrowser) return () => {}
    const wrapped = (e: Event) =>
      handler((e as CustomEvent<ThemeChangeDetail>).detail)
    document.addEventListener(EVENT_NAME, wrapped)
    return () => document.removeEventListener(EVENT_NAME, wrapped)
  },
}
