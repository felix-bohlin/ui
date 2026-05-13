/**
 * Minimal hex ↔ OKLCH conversion utilities.
 *
 * Used by the theme configurator / generator to let users pick a source
 * color from a native color picker and have it mapped back to the
 * `--palette-hue` / `--palette-chroma` sliders (and vice-versa).
 *
 * Algorithm: hex → linear sRGB → OKLab → OKLCH  (Björn Ottosson, 2020)
 */

function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function toGamma(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

/** Convert a 6-digit hex string (e.g. "#3b62d9") to OKLCH components. */
export function hexToOklch(hex: string): { L: number; C: number; H: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

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
  const hRad = H * (Math.PI / 180)
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // OKLab → linear sRGB (cube stage)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  const clamp = (v: number) => Math.max(0, Math.min(1, v))
  const ri = Math.round(clamp(toGamma(lr)) * 255)
  const gi = Math.round(clamp(toGamma(lg)) * 255)
  const bi = Math.round(clamp(toGamma(lb)) * 255)

  return "#" + [ri, gi, bi].map((v) => v.toString(16).padStart(2, "0")).join("")
}
