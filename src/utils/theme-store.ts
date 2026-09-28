/**
 * Single source of truth for the user-tweakable theme tokens.
 *
 * Both ThemeConfigurator (the global drawer) and the theme-generator page
 * route every read/write through this module. The store:
 *  - Persists per-mode JSON to localStorage under `opui-custom-theme-{light|dark}`
 *    (same keys the inline bootstrap in Header.astro reads on first paint).
 *  - Applies tokens to <html> when the edited mode matches the active site mode,
 *    so the docs chrome reflects edits live.
 *  - Emits a `theme:change` CustomEvent on `document` so any subscribed UI
 *    (the drawer, the generator page) re-syncs without DOM-bridging hacks.
 *
 * Boolean-ish settings (enable-grays) are stored as the string
 * "true"/"false" to stay byte-compatible with previously-saved configs.
 */

import { TOKENS, TOKEN_DEFAULTS, type Token } from "./theme-tokens"
import {
  isPresetId,
  presetById,
  PRESET_ATTRIBUTE,
  PRESET_STORAGE_KEY,
  type PresetId,
} from "./theme-presets"

export type Mode = "light" | "dark"

export { TOKENS, TOKEN_DEFAULTS, type Token }

export type ModeConfig = Partial<Record<Token, string>> & {
  "enable-grays"?: "true" | "false"
}

export type ChangeType =
  "set" | "reset" | "applyMode" | "enable-grays" | "preset"

export type ThemeChangeDetail = {
  mode: Mode
  type: ChangeType
  token?: Token
  value?: string
}

const EVENT_NAME = "theme:change"
const STORAGE_KEY = (mode: Mode) => `opui-custom-theme-${mode}`
const isBrowser = typeof window !== "undefined"

function readConfig(mode: Mode): ModeConfig {
  if (!isBrowser) return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY(mode))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as ModeConfig & {
      "--gray-hue-offset"?: string
    }
    // Drop the legacy `--gray-hue-offset` key. The new core derives grays
    // per-element using absolute `--gray-hue`, so the offset semantic no
    // longer applies. Users will fall back to the default --gray-hue (255).
    if ("--gray-hue-offset" in parsed) {
      delete parsed["--gray-hue-offset"]
    }
    return parsed
  } catch {
    return {}
  }
}

function writeConfig(mode: Mode, config: ModeConfig): void {
  if (!isBrowser) return
  localStorage.setItem(STORAGE_KEY(mode), JSON.stringify(config))
}

function emit(detail: ThemeChangeDetail): void {
  if (!isBrowser) return
  document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }))
}

function readPreset(): PresetId | null {
  if (!isBrowser) return null
  try {
    const raw = localStorage.getItem(PRESET_STORAGE_KEY)
    return isPresetId(raw) ? raw : null
  } catch {
    return null
  }
}

function clearTokens(): void {
  if (!isBrowser) return
  localStorage.removeItem(STORAGE_KEY("light"))
  localStorage.removeItem(STORAGE_KEY("dark"))
  localStorage.removeItem("opui-custom-theme") // legacy

  const html = document.documentElement
  TOKENS.forEach((t) => html.style.removeProperty(t))
  html.classList.remove("no-grays")
}

function defaults(): Record<Token, string> {
  return { ...TOKEN_DEFAULTS, ...presetById(readPreset())?.tokens }
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

  getPreset: readPreset,

  defaults,

  /** Resolve a token's effective value for `mode`, falling back to the default. */
  effective(mode: Mode, token: Token): string {
    return readConfig(mode)[token] ?? defaults()[token]
  },

  setPreset(id: PresetId | null): void {
    if (!isBrowser) return
    clearTokens()
    const html = document.documentElement
    if (id) {
      localStorage.setItem(PRESET_STORAGE_KEY, id)
      html.setAttribute(PRESET_ATTRIBUTE, id)
    } else {
      localStorage.removeItem(PRESET_STORAGE_KEY)
      html.removeAttribute(PRESET_ATTRIBUTE)
    }
    emit({ mode: getActiveSiteMode(), type: "preset", value: id ?? undefined })
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
   * Re-applies the saved config for `mode` to <html>. Mirrors
   * Header.astro's bootstrap so toggling the global theme and switching
   * configs always lands in a consistent state.
   */
  applyMode(mode: Mode = getActiveSiteMode()): void {
    if (!isBrowser) return
    const html = document.documentElement
    TOKENS.forEach((t) => html.style.removeProperty(t))
    html.classList.remove("no-grays")

    const config = readConfig(mode)
    for (const [name, value] of Object.entries(config)) {
      if (name === "enable-grays") {
        html.classList.toggle("no-grays", value === "false")
      } else if (typeof value === "string") {
        html.style.setProperty(name, value)
      }
    }
    emit({ mode, type: "applyMode" })
  },

  reset(): void {
    if (!isBrowser) return
    clearTokens()
    localStorage.removeItem(PRESET_STORAGE_KEY)
    document.documentElement.removeAttribute(PRESET_ATTRIBUTE)

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
