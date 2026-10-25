import { hexToOklch, oklchToHex } from "./color-utils"

type Rgb = [number, number, number]

const SURFACE_RATIO = 3

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
  const probe = document.createElement("div")
  probe.style.color = "color(from var(--ui-surface) srgb r g b)"
  host.append(probe)
  document.body.append(host)
  const surface = parseSrgb(getComputedStyle(probe).color)
  host.remove()
  return surface
}

const round = (value: number, digits: number) => +value.toFixed(digits)

export const fitBrand = (hex: string, scheme: "dark" | "light") => {
  const surface = surfaceOf(scheme)
  if (!surface || contrastRatio(hexToRgb(hex), surface) >= SURFACE_RATIO) {
    return hex
  }
  const { C, H, L } = hexToOklch(hex)
  const darker = luminance(surface) > 0.18
  const passes = (lightness: number) =>
    contrastRatio(hexToRgb(oklchToHex(lightness, C, H)), surface) >=
    SURFACE_RATIO
  let [low, high] = darker ? [0, L] : [L, 1]
  for (let step = 0; step < 24; step++) {
    const middle = (low + high) / 2
    if (passes(middle) === darker) low = middle
    else high = middle
  }
  return `oklch(${round(darker ? low : high, 3)} ${round(C, 3)} ${round(H, 1)})`
}

export const isHex = (value: string) => /^#[\da-f]{6}$/i.test(value)

export const brandTokens = (hex: string) => {
  const light = fitBrand(hex, "light")
  const dark = fitBrand(hex, "dark")
  return {
    "--ui-palette-source": hex,
    "--ui-primary-source":
      light === dark ? hex : `light-dark(${light}, ${dark})`,
  }
}

export const resolveHex = (color: string) => {
  const probe = document.createElement("div")
  probe.hidden = true
  probe.style.color = `color(from ${color} srgb r g b)`
  document.body.append(probe)
  const rgb = parseSrgb(getComputedStyle(probe).color)
  probe.remove()
  return rgb
    ? `#${rgb
        .map((channel) =>
          Math.round(channel * 255)
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")}`
    : null
}
