import { formatOklch, parseOklch } from "./color-utils"
import { CORNERS, cornersUpdate, type ThemeTokens } from "./theme"
import {
  CONTROLS,
  GROUPS,
  controlTokens,
  type ChoiceControl,
  type RangeControl,
} from "./theme-builder-controls"

export type RemixPart = {
  control: string
  tokens: Record<string, string | null>
}

export type Remix = { brand: string | null; parts: RemixPart[] }

export type Mood = {
  choices: Record<string, string>
  corners: string
  hint: string
  id: string
  label: string
}

export const LOCKED_BY_DEFAULT: string[] = []

export const STATUS_HUES: Record<string, { hue: number; lightness: number }> = {
  "--ui-critical": { hue: 25, lightness: 0.53 },
  "--ui-info": { hue: 240, lightness: 0.53 },
  "--ui-success": { hue: 145, lightness: 0.53 },
  "--ui-warning": { hue: 75, lightness: 0.66 },
}

const hueDelta = (from: number, to: number) =>
  ((((to - from) % 360) + 540) % 360) - 180

const nudge = (hue: number, toward: number, max: number) =>
  (hue + Math.max(-max, Math.min(max, hueDelta(hue, toward))) + 360) % 360

export const statusFromBrand = (brand: string): ThemeTokens => {
  const source = parseOklch(brand)
  if (!source) return {}
  const chroma = Math.min(0.2, Math.max(0.14, source.C))
  return Object.fromEntries(
    Object.entries(STATUS_HUES).map(([token, { hue, lightness }]) => [
      token,
      formatOklch({
        C: token === "--ui-warning" ? Math.min(chroma, 0.17) : chroma,
        H: nudge(hue, source.H, 12),
        L: lightness,
      }),
    ]),
  )
}

export const HARMONIES = ["analogous", "brand", "complementary", "pure"]

export const grayFromBrand = (brand: string, harmony: string): ThemeTokens => {
  const source = parseOklch(brand)
  if (!source || harmony === "pure") {
    return { "--ui-gray-chroma": "0", "--ui-gray-hue": "0" }
  }
  const hue =
    harmony === "analogous"
      ? (source.H + 30) % 360
      : harmony === "complementary"
        ? (source.H + 180) % 360
        : source.H
  return {
    "--ui-gray-chroma": harmony === "complementary" ? "0.008" : "0.012",
    "--ui-gray-hue": `${Math.round(hue)}`,
  }
}

export const MOODS: Mood[] = [
  {
    choices: {
      "border-width": "1px",
      "button-shape": "follow",
      "button-weight": "500",
      density: "0.875",
      "font-body": "System",
      "line-height": "compact",
      shadows: "subtle",
    },
    corners: "0.25rem",
    hint: "Small corners, thin borders, the system font and compact controls",
    id: "corporate",
    label: "Corporate",
  },
  {
    choices: {
      "button-shape": "follow",
      "font-heading": "Serif",
      "heading-tracking": "normal",
      "line-height": "default",
      shadows: "flat",
      underline: "loose",
    },
    corners: "0.25rem",
    hint: "Serif headings, a relaxed line height, no shadows and loose underlines",
    id: "editorial",
    label: "Editorial",
  },
  {
    choices: {
      "border-width": "1px",
      "gray-tint": "pure",
      "primary-tone": "monochrome",
      selected: "subtle",
      shadows: "flat",
      tonal: "neutral",
    },
    corners: "0",
    hint: "No corners, a black and white accent, pure grays and no shadows",
    id: "minimal",
    label: "Minimal",
  },
  {
    choices: {
      "button-shape": "pill",
      density: "1.125",
      "font-body": "DM Sans",
      "heading-tracking": "tight",
      "motion-personality": "lively",
      shadows: "soft",
      tonal: "tint",
    },
    corners: "1rem",
    hint: "Large corners, pill buttons, DM Sans, comfortable controls, soft shadows and lively motion",
    id: "playful",
    label: "Playful",
  },
]

const SHUFFLE_RANGES: Record<string, [number, number]> = {
  "space-scale": [0.9, 1.15],
}

const choiceControl = (id: string) =>
  CONTROLS.find(
    (control): control is ChoiceControl =>
      control.id === id && control.kind === "choice",
  )

export const optionTokens = (id: string, value: string) => {
  const control = choiceControl(id)
  const option = control?.options.find((entry) => entry.value === value)
  if (!control || !option) throw new Error(`${id} has no ${value} option`)
  return Object.fromEntries(
    controlTokens(control).map((token) => [
      token,
      option.tokens[token] ?? null,
    ]),
  )
}

export const moodRemix = (mood: Mood, tokens: ThemeTokens): Remix => ({
  brand: null,
  parts: [
    { control: "corners", tokens: cornersUpdate(tokens, mood.corners) },
    ...Object.entries(mood.choices)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([id, value]) => ({ control: id, tokens: optionTokens(id, value) })),
  ],
})

const pick = <T>(items: T[], random: () => number) =>
  items[Math.min(items.length - 1, Math.floor(random() * items.length))]

const rangeValue = (control: RangeControl, random: () => number) => {
  const [min, max] = SHUFFLE_RANGES[control.id] ?? [control.min, control.max]
  const steps = Math.round((max - min) / control.step)
  const number = +(min + Math.round(random() * steps) * control.step).toFixed(4)
  return control.scale === "density"
    ? `calc(${number}${control.unit} * var(--ui-density))`
    : `${number}${control.unit}`
}

export const randomBrand = (random: () => number) =>
  `oklch(${(0.55 + random() * 0.1).toFixed(2)} ${(0.12 + random() * 0.08).toFixed(3)} ${Math.round(random() * 360)})`

export const shuffleRemix = (
  locked: string[],
  tokens: ThemeTokens,
  random = Math.random,
): Remix => {
  const remix: Remix = { brand: null, parts: [] }
  const brand = locked.includes("brand")
    ? (tokens["--ui-palette-source"] ?? null)
    : randomBrand(random)
  for (const group of GROUPS) {
    if (locked.includes(group.id)) continue
    for (const control of group.controls) {
      if (control.tier !== "basic") continue
      if (control.kind === "brand") {
        remix.brand = brand
      } else if (control.id === "gray-tint" && brand) {
        remix.parts.push({
          control: control.id,
          tokens: grayFromBrand(brand, pick(HARMONIES, random)),
        })
      } else if (control.kind === "color" && group.id === "status") {
        if (!brand) continue
        const status = statusFromBrand(brand)
        if (control.token in status) {
          remix.parts.push({
            control: control.id,
            tokens: { [control.token]: status[control.token] },
          })
        }
      } else if (control.kind === "corners") {
        remix.parts.push({
          control: control.id,
          tokens: cornersUpdate(tokens, pick(CORNERS, random).value),
        })
      } else if (control.kind === "choice") {
        const options = control.options.filter(
          (option) => Object.keys(option.tokens).length > 0,
        )
        remix.parts.push({
          control: control.id,
          tokens: optionTokens(control.id, pick(options, random).value),
        })
      } else if (control.kind === "range") {
        remix.parts.push({
          control: control.id,
          tokens: { [control.token]: rangeValue(control, random) },
        })
      }
    }
  }
  return remix
}
