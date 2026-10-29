/**
 * Minimal hex ↔ OKLCH conversion utilities.
 *
 * Used by the theme brand color to move a picked color's lightness until it
 * reads against the surface.
 *
 * Algorithm: hex → linear sRGB → OKLab → OKLCH  (Björn Ottosson, 2020)
 */

import {
  formatOklch,
  oklchGamut,
  oklchToLinearSrgb,
  parseOklch,
} from "../../packages/opui/elements/color-field.js"

export { formatOklch, oklchGamut, oklchToLinearSrgb, parseOklch }

function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function toGamma(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

/** Convert a 6-digit hex string (e.g. "#3b62d9") to OKLCH components. */
export function hexToOklch(hex: string): { L: number; C: number; H: number } {
  return srgbToOklch(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  )
}

export function srgbToOklch(
  r: number,
  g: number,
  b: number,
): { L: number; C: number; H: number } {
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)

  // linear sRGB → OKLab (cube-root stage)
  const l_ = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  )
  const m_ = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  )
  const s_ = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  )

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const C = Math.sqrt(a * a + bk * bk)
  let H = Math.atan2(bk, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return { L, C, H }
}

/**
 * Convert OKLCH components to the nearest in-gamut sRGB hex string.
 * Out-of-gamut values are clamped to [0, 1] per channel.
 */
export function oklchToHex(L: number, C: number, H: number): string {
  const [lr, lg, lb] = oklchToLinearSrgb(L, C, H)

  const clamp = (v: number) => Math.max(0, Math.min(1, v))
  const ri = Math.round(clamp(toGamma(lr)) * 255)
  const gi = Math.round(clamp(toGamma(lg)) * 255)
  const bi = Math.round(clamp(toGamma(lb)) * 255)

  return "#" + [ri, gi, bi].map((v) => v.toString(16).padStart(2, "0")).join("")
}

export type Oklch = { C: number; H: number; L: number }

const SRGB_TO_P3 = [
  [0.8224621209, 0.177537879, 0],
  [0.0331941989, 0.9668058011, 0],
  [0.0170826307, 0.0723974407, 0.9105199286],
]

const P3_LUMINANCE = [0.2289745641, 0.6917385218, 0.0792869141]

const SRGB_LUMINANCE = [0.2126, 0.7152, 0.0722]

const toP3 = (srgb: number[]) =>
  SRGB_TO_P3.map((row) =>
    row.reduce((sum, weight, index) => sum + weight * srgb[index], 0),
  )

const clippedLuminance = (channels: number[], weights: number[]) =>
  channels.reduce(
    (sum, channel, index) =>
      sum + weights[index] * Math.min(1, Math.max(0, channel)),
    0,
  )

export function oklchLuminances(L: number, C: number, H: number) {
  const srgb = oklchToLinearSrgb(L, C, H)
  return [
    clippedLuminance(srgb, SRGB_LUMINANCE),
    clippedLuminance(toP3(srgb), P3_LUMINANCE),
  ]
}

export function colorToOklch(value: string): Oklch | null {
  const trimmed = value.trim()
  if (/^#[\da-f]{6}$/i.test(trimmed)) return hexToOklch(trimmed)
  const parsed = parseOklch(trimmed)
  return parsed && { C: parsed.C, H: parsed.H, L: parsed.L }
}
