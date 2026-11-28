import paletteSource from "@opui/core/palette.css?raw"

const STEP = /^\s*(--ui-(color|gray)-(\d+)):\s*([^;]+);/gm
const LIGHTNESS = /^oklch\(\s*from var\(--ui-palette-source\)\s+([\d.]+%)/

export const paletteSteps = (css = paletteSource) =>
  [...css.matchAll(STEP)].map(([, name, family, step, value]) => ({
    family,
    lightness: value.trim().match(LIGHTNESS)?.[1],
    name,
    step: Number(step),
    value: value.replaceAll(/\s+/g, " ").trim(),
  }))
