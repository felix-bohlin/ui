import { TOKENS, type Token } from "./theme-tokens"

export type PresetId =
  "brutalist" | "elegant" | "pixelated" | "shadcn" | "wedding"

export type PresetTokens = Partial<Record<Token, string>>

export type Preset = {
  id: PresetId
  label: string
  tagline: string
  description: string
  css: string
  tokens: PresetTokens
}

export const PRESET_STORAGE_KEY = "opui-theme-preset"
export const PRESET_ATTRIBUTE = "data-theme"

const PRESET_META = [
  {
    id: "brutalist",
    label: "Brutalist",
    tagline: "Thick borders, hard shadows, one loud color.",
    description:
      "Black on white, three pixel borders and offset shadows that jump when you hover. Turns motion off entirely, drops every radius to zero and uses a monospace body with heavy uppercase headings.",
  },
  {
    id: "elegant",
    label: "Elegant",
    tagline: "Editorial serif, hairlines and lots of air.",
    description:
      "A warm paper palette with a deep teal accent. Serif type throughout, underline-only text fields, tracked uppercase labels and soft, wide shadows instead of borders.",
  },
  {
    id: "pixelated",
    label: "Pixelated",
    tagline: "8-bit corners and a Game Boy palette.",
    description:
      "Square everything, a real pixel font throughout, notched corners drawn with box shadows, crisp edges on icons and images, and stepped motion instead of easing.",
  },
  {
    id: "shadcn",
    label: "shadcn clone",
    tagline: "The neutral zinc look everyone recognizes.",
    description:
      "Near-black primary, zinc grays, medium-weight 14px controls, subtle one pixel shadows and a translucent three pixel focus ring. As close as the tokens get without touching the components.",
  },
  {
    id: "wedding",
    label: "Wedding",
    tagline: "Blush, cream, gold and a script headline.",
    description:
      "Rose primary on cream surfaces with thin gold rules. Script headings, small-caps subheadings, pill buttons and double-line frames around cards, like a good invitation.",
  },
] as const satisfies readonly Omit<Preset, "css" | "tokens">[]

const rawCss = import.meta.glob("../styles/themes/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

export function presetScope(id: PresetId) {
  return `[${PRESET_ATTRIBUTE}="${id}"]`
}

function parseTokens(css: string): PresetTokens {
  const tokens: PresetTokens = {}
  for (const token of TOKENS) {
    const match = css.match(new RegExp(`(?<![\\w-])${token}:\\s*([^;]+);`))
    if (match) tokens[token] = match[1].trim()
  }
  return tokens
}

export const PRESETS: readonly Preset[] = PRESET_META.map((meta) => {
  const css = rawCss[`../styles/themes/${meta.id}.css`]
  if (css === undefined) {
    throw new Error(`Missing stylesheet for theme preset "${meta.id}"`)
  }
  return { ...meta, css, tokens: parseTokens(css) }
})

export const PRESET_IDS: readonly PresetId[] = PRESETS.map((p) => p.id)

export function isPresetId(value: unknown): value is PresetId {
  return typeof value === "string" && PRESET_IDS.includes(value as PresetId)
}

export function presetById(id: string | null | undefined) {
  return PRESETS.find((p) => p.id === id)
}

export function portableCss(preset: Preset, siteOrigin: string) {
  return preset.css
    .replaceAll(presetScope(preset.id), ":root")
    .replaceAll('url("/', `url("${siteOrigin}/`)
}
