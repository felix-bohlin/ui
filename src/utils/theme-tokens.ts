export type Token =
  | "--palette-hue"
  | "--palette-chroma"
  | "--palette-hue-rotate-by"
  | "--gray-chroma"
  | "--gray-hue"
  | "--border-radius"
  | "--field-border-radius"
  | "--button-border-radius"

export const TOKENS = [
  "--palette-hue",
  "--palette-chroma",
  "--palette-hue-rotate-by",
  "--gray-chroma",
  "--gray-hue",
  "--border-radius",
  "--field-border-radius",
  "--button-border-radius",
] as const satisfies readonly Token[]

// Defaults must mirror what `packages/opui/css/theme.css` ships
// so the configurators (drawer + generator) reflect the live site palette
// before the user has tweaked anything. theme.css hardcodes
//   --palette-source: oklch(0.58 calc(0.21 * 0.5) var(--hue-blue))
// where Open Props' --hue-blue is 240, hence chroma 0.5 / hue 240.
export const TOKEN_DEFAULTS: Record<Token, string> = {
  "--palette-hue": "240",
  "--palette-chroma": "0.5",
  "--palette-hue-rotate-by": "0",
  "--gray-chroma": "0.01",
  "--gray-hue": "255",
  "--border-radius": "var(--size-2)",
  "--field-border-radius": "var(--size-2)",
  "--button-border-radius": "var(--size-2)",
}

export const RADIUS_OPTIONS = [
  { text: "0", value: "0" },
  { text: "1", value: "var(--size-1)" },
  { text: "2", value: "var(--size-2)" },
  { text: "3", value: "var(--size-3)" },
  { text: "4", value: "var(--size-4)" },
]
