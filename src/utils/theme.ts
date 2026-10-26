import { EXAMPLE_THEMES } from "./example-themes"
import { readStored, removeStored, writeStored } from "./storage"

export type ThemeTokens = Record<string, string>

export type Theme = { preset: string | null; tokens: ThemeTokens }

export type StoredTheme = Theme & { css: string }

export const THEME_KEY = "opui-theme"

export const VIEW_KEYS = { contrast: "contrast", mode: "theme" } as const

export const LEGACY_KEYS = [
  "opui-custom-theme",
  "opui-custom-theme-dark",
  "opui-custom-theme-light",
  "opui-example-theme",
]

export const LAYERS = `@layer openprops, theme, normalize, components.prose, components.root, components.extended, components.compat, utils;
@layer theme.palette, theme.base, theme.custom;
`

export const PLACEHOLDER_CSS = `${LAYERS}
@layer theme.custom {
  /* Change a setting to build your theme */
}
`

const HANDBACK = [
  "--ui-border-color",
  "--ui-field-border-color",
  "--ui-field-helper-text-color",
  "--ui-focus-ring-color",
  "--ui-text-subtle",
]

export const BRAND_SWATCHES = [
  { label: "Astro", value: "#F041FF" },
  { label: "React", value: "#61DAFB" },
  { label: "Svelte", value: "#FF3E00" },
  { label: "Vue", value: "#41B883" },
]

export const CORNERS = [
  { label: "None", value: "0" },
  { label: "Small", value: "0.25rem" },
  { label: "Medium", value: "0.5rem" },
  { label: "Large", value: "1rem" },
]

export const BRAND_TOKENS = ["--ui-palette-source", "--ui-primary-source"]

export const CORNER_TOKENS = [
  "--ui-button-radius",
  "--ui-chip-radius",
  "--ui-dialog-radius",
  "--ui-field-radius",
  "--ui-menu-radius",
  "--ui-radius",
  "--ui-radius-small",
  "--ui-radius-x-small",
]

export const COMPONENT_RADII = CORNER_TOKENS.filter(
  (name) => !name.startsWith("--ui-radius"),
)

export const FOLLOW_RADIUS = "var(--ui-radius)"

export const FONT_TOKENS = ["--ui-font-body", "--ui-font-heading"]

const isBrowser = typeof window !== "undefined"

const UNSAFE_VALUE = /[{};<>\\\p{Cc}]|\/\*|@import|image-set\(|url\(/iu

const CLOSING: Record<string, string> = { "(": ")", "[": "]" }

const isBalanced = (value: string) => {
  const open: string[] = []
  let quote = ""
  for (const char of value) {
    if (quote) {
      if (char === quote) quote = ""
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char in CLOSING) {
      open.push(CLOSING[char])
    } else if (char === ")" || char === "]") {
      if (open.pop() !== char) return false
    } else if (char === "!") {
      return false
    }
  }
  return quote === "" && open.length === 0
}

const TOKEN_NAME = /^--ui-[a-z\d-]+$/

export const isSafeToken = (name: string, value: string) =>
  TOKEN_NAME.test(name) &&
  value.trim() !== "" &&
  !UNSAFE_VALUE.test(value) &&
  isBalanced(value)

const EVENT_NAME = "theme:change"

const sortTokens = (tokens: ThemeTokens) =>
  Object.fromEntries(
    Object.entries(tokens).toSorted(([a], [b]) => a.localeCompare(b)),
  )

const rule = (selector: string, entries: [string, string][], indent = "  ") =>
  `${indent}${selector} {\n${entries
    .map(([name, value]) => `${indent}  ${name}: ${value};`)
    .join("\n")}\n${indent}}`

export const emptyTheme = (): Theme => ({ preset: null, tokens: {} })

export const presetCss = (preset: string | null) =>
  EXAMPLE_THEMES.find((theme) => theme.name === preset)?.css ?? ""

export const customCss = (tokens: ThemeTokens) => {
  const entries = Object.entries(sortTokens(tokens))
  if (entries.length === 0) return ""
  const handback = entries
    .filter(([name]) => HANDBACK.includes(name))
    .map(([name]): [string, string] => [name, "revert-layer"])
  return [
    "@layer theme.custom {",
    rule(":where(html, .ui-palette, .ui-contrast-more)", entries),
    ...(handback.length > 0
      ? [
          "",
          "  @media (prefers-contrast: more) {",
          rule(
            ":where(\n      html:not(.ui-contrast-normal),\n      html:not(.ui-contrast-normal) .ui-palette\n    )",
            handback,
            "    ",
          ),
          "  }",
          "",
          rule(
            ":where(.ui-contrast-more, .ui-contrast-more .ui-palette)",
            handback,
          ),
        ]
      : []),
    "}",
    "",
  ].join("\n")
}

export const exportCss = ({ preset, tokens }: Theme) => {
  const base = presetCss(preset)
  const custom = customCss(tokens)
  if (!base && !custom) return PLACEHOLDER_CSS
  if (!base) return `${LAYERS}\n${custom}`
  return custom ? `${base.trimEnd()}\n\n${custom}` : base
}

export const normalizeTheme = (value: unknown): Theme => {
  if (!value || typeof value !== "object") return emptyTheme()
  const { preset, tokens } = value as Partial<Theme>
  return {
    preset:
      typeof preset === "string" &&
      EXAMPLE_THEMES.some((theme) => theme.name === preset)
        ? preset
        : null,
    tokens: sortTokens(
      Object.fromEntries(
        Object.entries(
          tokens && typeof tokens === "object" ? tokens : {},
        ).filter(
          ([name, token]) =>
            typeof token === "string" && isSafeToken(name, token),
        ),
      ),
    ),
  }
}

const LEGACY_PALETTE = ["--ui-palette-chroma", "--ui-palette-hue"]

const LEGACY_SIZES: Record<string, string> = {
  1: "0.25rem",
  2: "0.5rem",
  3: "1rem",
  4: "1.25rem",
}

export const migrateLegacy = (read: (key: string) => unknown) => {
  const preset = read("opui-example-theme")
  const config =
    read("opui-custom-theme-light") ??
    read("opui-custom-theme-dark") ??
    read("opui-custom-theme")
  if (preset === null && config === null) return null
  const tokens: ThemeTokens = {}
  if (config && typeof config === "object") {
    for (const [name, value] of Object.entries(config)) {
      if (typeof value === "string" && !LEGACY_PALETTE.includes(name)) {
        const size = /^var\(--(?:radius|size)-(\d)\)$/.exec(value)?.[1]
        tokens[name] = (size && LEGACY_SIZES[size]) || value
      }
    }
    const { "--ui-palette-chroma": chroma, "--ui-palette-hue": hue } =
      config as Record<string, unknown>
    if (typeof hue === "string" || typeof chroma === "string") {
      tokens["--ui-palette-source"] =
        `oklch(58% ${+(0.21 * Number(chroma ?? 0.5)).toFixed(3)} ${hue ?? 145})`
      tokens["--ui-primary-source"] =
        "light-dark(var(--ui-color-9), var(--ui-color-6))"
    }
  }
  return normalizeTheme({ preset, tokens })
}

const readLegacy = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return null
    return key === "opui-example-theme" ? value : JSON.parse(value)
  } catch {
    return null
  }
}

const store = (theme: Theme): StoredTheme => ({
  ...theme,
  css: customCss(theme.tokens),
})

const apply = (theme: StoredTheme) => {
  window.themeUtils.applyThemeCss(theme.preset, theme.css, theme.tokens)
}

const emit = (theme: Theme) => {
  document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: theme }))
}

let memory: Theme | null = null

if (isBrowser) {
  window.addEventListener("storage", (event) => {
    if (event.key === THEME_KEY || event.key === null) memory = null
  })
}

const read = () => {
  if (memory) return memory
  const stored = readStored<unknown>(THEME_KEY, null)
  if (stored !== null) return normalizeTheme(stored)
  const legacy = migrateLegacy(readLegacy)
  if (!legacy) return emptyTheme()
  const next = store(legacy)
  writeStored(THEME_KEY, next)
  for (const key of LEGACY_KEYS) removeStored(key)
  memory = legacy
  apply(next)
  return legacy
}

export const cornersOf = (tokens: ThemeTokens) => {
  if (CORNER_TOKENS.every((name) => !(name in tokens))) return null
  const value = tokens["--ui-radius"]
  const macro = cornersTokens(value ?? "")
  return CORNERS.some((option) => option.value === value) &&
    CORNER_TOKENS.every((name) => tokens[name] === macro[name])
    ? value
    : "custom"
}

export const cornersUpdate = (tokens: ThemeTokens, value: string | null) => {
  const update = cornersTokens(value)
  if (value !== null) {
    for (const name of COMPONENT_RADII) {
      if (tokens[name] !== undefined && tokens[name] !== FOLLOW_RADIUS) {
        delete update[name]
      }
    }
  }
  return update
}

export const cornersTokens = (value: string | null) =>
  Object.fromEntries(
    CORNER_TOKENS.map((name) => [
      name,
      value === null
        ? null
        : name === "--ui-radius"
          ? value
          : name === "--ui-radius-small"
            ? "min(5px, var(--ui-radius))"
            : name === "--ui-radius-x-small"
              ? "min(2px, var(--ui-radius))"
              : FOLLOW_RADIUS,
    ]),
  ) as Record<string, string | null>

export const themeStore = {
  get() {
    if (!isBrowser) return emptyTheme()
    return read()
  },

  set(theme: Theme) {
    if (!isBrowser) return
    const next = store(normalizeTheme(theme))
    memory = { preset: next.preset, tokens: next.tokens }
    writeStored(THEME_KEY, next)
    apply(next)
    emit(next)
  },

  update(tokens: Record<string, string | null>) {
    const current = themeStore.get()
    const next = { ...current.tokens }
    for (const [name, value] of Object.entries(tokens)) {
      if (value === null) delete next[name]
      else next[name] = value
    }
    themeStore.set({ ...current, tokens: next })
  },

  setPreset(preset: string | null) {
    themeStore.set({ ...themeStore.get(), preset })
  },

  reset() {
    themeStore.set(emptyTheme())
  },

  subscribe(handler: (theme: Theme) => void) {
    if (!isBrowser) return () => {}
    const onChange = (event: Event) =>
      handler((event as CustomEvent<Theme>).detail)
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) {
        handler(themeStore.get())
      }
    }
    document.addEventListener(EVENT_NAME, onChange)
    window.addEventListener("storage", onStorage)
    return () => {
      document.removeEventListener(EVENT_NAME, onChange)
      window.removeEventListener("storage", onStorage)
    }
  },
}
