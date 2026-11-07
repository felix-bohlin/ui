import { srgbToOklch, formatOklch } from "./color-utils"
import { EXAMPLE_THEMES } from "./example-themes"
import { isSafeToken, type Theme, type ThemeTokens } from "./theme"

export type Paste =
  | { colors: string[]; kind: "colors" }
  | { kind: "css"; theme: Theme }
  | { kind: "none" }

const DECLARATION = /(--ui-[a-z\d-]+)\s*:\s*([^;{}]+);/g

const COLOR =
  /#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\((?:[^()]|\([^()]*\))*\)/gi

const SHORT_HEX = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i

const expandHex = (hex: string) => {
  const short = hex.match(SHORT_HEX)
  if (!short) return hex
  const [, r, g, b, a] = short
  return `#${r}${r}${g}${g}${b}${b}${a ? `${a}${a}` : ""}`
}

const tokensIn = (css: string) => {
  const tokens: ThemeTokens = {}
  for (const [, name, raw] of css.matchAll(DECLARATION)) {
    const value = raw.replace(/\s+/g, " ").trim()
    if (isSafeToken(name, value)) tokens[name] = value
  }
  return tokens
}

export const parsePaste = (text: string): Paste => {
  const trimmed = text.trim()
  if (trimmed === "") return { kind: "none" }
  if (/--ui-[a-z\d-]+\s*:/.test(trimmed)) {
    const preset = EXAMPLE_THEMES.find((theme) =>
      trimmed.includes(theme.css.trim()),
    )
    const custom = preset ? trimmed.replace(preset.css.trim(), "") : trimmed
    return {
      kind: "css",
      theme: { preset: preset?.name ?? null, tokens: tokensIn(custom) },
    }
  }
  const colors = [...new Set(trimmed.match(COLOR) ?? [])].map(expandHex)
  return colors.length > 0 ? { colors, kind: "colors" } : { kind: "none" }
}

export const STATUS_ORDER = [
  "--ui-critical",
  "--ui-info",
  "--ui-success",
  "--ui-warning",
]

export const imageColor = (data: Uint8ClampedArray | number[], step = 1) => {
  const buckets = new Map<
    number,
    {
      count: number
      l: number
      c: number
      weight: number
      x: number
      y: number
    }
  >()
  for (let index = 0; index + 3 < data.length; index += 4 * step) {
    const alpha = data[index + 3] / 255
    if (alpha < 0.5) continue
    const { C, H, L } = srgbToOklch(
      data[index] / 255,
      data[index + 1] / 255,
      data[index + 2] / 255,
    )
    if (C < 0.04 || L < 0.2 || L > 0.9) continue
    const bucket = Math.floor(H / 20)
    const weight = C * alpha
    const entry = buckets.get(bucket) ?? {
      count: 0,
      l: 0,
      c: 0,
      weight: 0,
      x: 0,
      y: 0,
    }
    entry.count++
    entry.weight += weight
    entry.l += L * weight
    entry.c += C * weight
    entry.x += Math.cos((H * Math.PI) / 180) * weight
    entry.y += Math.sin((H * Math.PI) / 180) * weight
    buckets.set(bucket, entry)
  }
  const best = [...buckets.values()].toSorted((a, b) => b.weight - a.weight)[0]
  if (!best) return null
  const hue = (Math.atan2(best.y, best.x) * 180) / Math.PI
  return formatOklch({
    C: Math.min(0.2, Math.max(0.1, best.c / best.weight)),
    H: ((hue % 360) + 360) % 360,
    L: Math.min(0.68, Math.max(0.5, best.l / best.weight)),
  })
}
