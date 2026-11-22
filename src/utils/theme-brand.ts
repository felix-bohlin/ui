import {
  colorToOklch,
  formatOklch,
  oklchLuminances,
  parseOklch,
} from "./color-utils"
import { probeColors } from "./color-probe"
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

const luminance = (rgb: Rgb) =>
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
  const [[color]] = probeColors(document.body, [
    {
      className: `ui-${scheme}`,
      colors: ["color(from var(--ui-surface) srgb r g b)"],
    },
  ])
  return parseSrgb(color)
}

const fitBrand = (color: string, scheme: "dark" | "light") => {
  const surface = surfaceOf(scheme)
  const oklch = colorToOklch(color)
  if (!surface || !oklch) return color
  const { C, H, L } = oklch
  const surfaceY = luminance(surface)
  const passes = (lightness: number) =>
    oklchLuminances(lightness, C, H).every(
      (y) =>
        (Math.max(y, surfaceY) + 0.05) / (Math.min(y, surfaceY) + 0.05) >=
        SURFACE_RATIO,
    )
  if (passes(L)) return color
  const darker = surfaceY > 0.18
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
  const [[resolved]] = probeColors(document.body, [
    { className: "", colors: [`oklch(from ${color} l c h)`] },
  ])
  const oklch = parseOklch(resolved)
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
