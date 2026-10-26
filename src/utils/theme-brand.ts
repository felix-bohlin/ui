import {
  colorToOklch,
  formatOklch,
  oklchToHex,
  parseOklch,
} from "./color-utils"
import { themeStore, type ThemeTokens } from "./theme"

type Rgb = [number, number, number]

const SURFACE_RATIO = 3

const BRAND_GRAY_CHROMA = "0.012"

export const BALANCED_PRIMARY =
  "light-dark(var(--ui-color-9), var(--ui-color-6))"

export const MONOCHROME_PRIMARY =
  "light-dark(oklch(0.205 0 0), oklch(0.922 0 0))"

const clip = (value: number) => Math.min(1, Math.max(0, value))

const parseSrgb = (value: string): Rgb | null => {
  const match = value.match(/^color\(srgb ([^\s)]+) ([^\s)]+) ([^\s)]+)/)
  return match
    ? [clip(Number(match[1])), clip(Number(match[2])), clip(Number(match[3]))]
    : null
}

const hexToRgb = (hex: string): Rgb => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
]

export const luminance = (rgb: Rgb) =>
  rgb
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index],
      0,
    )

export const contrastRatio = (a: Rgb, b: Rgb) => {
  const [high, low] = [luminance(a), luminance(b)].toSorted((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

const surfaceOf = (scheme: "dark" | "light") => {
  const host = document.createElement("div")
  host.className = `ui-${scheme}`
  host.hidden = true
  host.style.forcedColorAdjust = "none"
  const probe = document.createElement("div")
  probe.style.color = "color(from var(--ui-surface) srgb r g b)"
  host.append(probe)
  document.body.append(host)
  const surface = parseSrgb(getComputedStyle(probe).color)
  host.remove()
  return surface
}

export const fitBrand = (color: string, scheme: "dark" | "light") => {
  const surface = surfaceOf(scheme)
  const oklch = colorToOklch(color)
  if (!surface || !oklch) return color
  const { C, H, L } = oklch
  const passes = (lightness: number) =>
    contrastRatio(hexToRgb(oklchToHex(lightness, C, H)), surface) >=
    SURFACE_RATIO
  if (passes(L)) return color
  const darker = luminance(surface) > 0.18
  let [low, high] = darker ? [0, L] : [L, 1]
  for (let step = 0; step < 24; step++) {
    const middle = (low + high) / 2
    if (passes(middle) === darker) low = middle
    else high = middle
  }
  return formatOklch({ C, H, L: darker ? low : high })
}

export const isBrandColor = (value: string) => colorToOklch(value) !== null

export const brandTokens = (color: string) => {
  const light = fitBrand(color, "light")
  const dark = fitBrand(color, "dark")
  return {
    "--ui-palette-source": color,
    "--ui-primary-source":
      light === dark ? color : `light-dark(${light}, ${dark})`,
  }
}

export const resolveOklch = (color: string) => {
  const probe = document.createElement("div")
  probe.hidden = true
  probe.style.color = `oklch(from ${color} l c h)`
  probe.style.forcedColorAdjust = "none"
  document.body.append(probe)
  const oklch = parseOklch(getComputedStyle(probe).color)
  probe.remove()
  return oklch && formatOklch(oklch)
}

const grayHueOf = (color: string) =>
  String(Math.round(colorToOklch(color)?.H ?? 0))

export const brandUpdate = (tokens: ThemeTokens, color: string) => {
  const previous = tokens["--ui-palette-source"]
  const primary = tokens["--ui-primary-source"] ?? ""
  const update: Record<string, string> = [
    BALANCED_PRIMARY,
    MONOCHROME_PRIMARY,
  ].includes(primary)
    ? { "--ui-palette-source": color }
    : brandTokens(color)
  if (
    previous &&
    isBrandColor(previous) &&
    tokens["--ui-gray-chroma"] === BRAND_GRAY_CHROMA &&
    tokens["--ui-gray-hue"] === grayHueOf(previous)
  ) {
    update["--ui-gray-hue"] = grayHueOf(color)
  }
  return update
}

export const switchPreset = (preset: string | null) => {
  const { tokens } = themeStore.get()
  const brand = tokens["--ui-palette-source"]
  const fitted =
    !!brand &&
    isBrandColor(brand) &&
    tokens["--ui-primary-source"] === brandTokens(brand)["--ui-primary-source"]
  themeStore.setPreset(preset)
  if (fitted) themeStore.update(brandTokens(brand))
}
