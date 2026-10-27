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

export const LOCKED_BY_DEFAULT = ["status"]

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
      shadows: "soft",
      tonal: "tint",
    },
    corners: "1rem",
    hint: "Large corners, pill buttons, DM Sans, comfortable controls and soft shadows",
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
  for (const group of GROUPS) {
    if (locked.includes(group.id)) continue
    for (const control of group.controls) {
      if (control.tier !== "basic") continue
      if (control.kind === "brand") {
        remix.brand = randomBrand(random)
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
