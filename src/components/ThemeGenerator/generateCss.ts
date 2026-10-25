/**
 * Pure function that turns the saved per-mode configs into a copy-pasteable
 * `custom-theme.css` snippet. It only holds the tokens that differ from what
 * `packages/opui/css/theme.css` ships, in the `theme.custom` layer, so it
 * keeps working when a release adds or changes other tokens.
 *
 * It starts with the layer order, so it also works when it loads before the
 * library.
 *
 * Per-mode differences:
 *  - Tokens that differ from the light defaults go in `:where(html)`.
 *  - Dark values that differ from what the light block and the dark defaults
 *    already give go in `:where(html.ui-dark)` and the matching
 *    `prefers-color-scheme: dark` block.
 *  - An example theme's tokens come first, and the other tokens only when
 *    they differ from it. Once a palette knob is set, the theme's
 *    `--ui-palette-source` and `--ui-primary-source` are left out.
 *  - With grays disabled, every role theme.css derives from a gray step goes
 *    in `:where(html, .ui-palette, .ui-contrast-more)` with the palette step
 *    of the same number instead.
 */

import {
  PALETTE_KNOBS,
  TOKENS,
  tokenDefaults,
  type ModeConfig,
  type Token,
} from "../../utils/theme-store"
import { themeTokens } from "../../utils/theme-tokens"

type Snapshot = Record<Token, string>

const GRAY_STEP = /--ui-gray-(\d+)/g

const splitLightDark = (value: string): [string, string] => {
  const match = value.match(/^light-dark\(([\s\S]*)\)$/)
  if (!match) return [value, value]
  let depth = 0
  for (let index = 0; index < match[1].length; index++) {
    const char = match[1][index]
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) {
      return [match[1].slice(0, index).trim(), match[1].slice(index + 1).trim()]
    }
  }
  return [value, value]
}

const GRAY_ROLES = themeTokens()
  .filter((token) => !token.optional && /--ui-gray-\d+/.test(token.value))
  .map((token) => ({
    name: token.name,
    parts: splitLightDark(
      token.value.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")"),
    ),
  }))

const paletteSteps = (value: string) =>
  value.replace(GRAY_STEP, "--ui-color-$1")

function rampValue(
  [lightPart, darkPart]: [string, string],
  grays: { light: boolean; dark: boolean },
) {
  const light = grays.light ? lightPart : paletteSteps(lightPart)
  const dark = grays.dark ? darkPart : paletteSteps(darkPart)
  return light === dark ? light : `light-dark(${light}, ${dark})`
}

function snapshotFor(
  config: ModeConfig,
  defaults: Record<Token, string>,
): Snapshot {
  const out = { ...defaults }
  for (const [key, value] of Object.entries(config)) {
    if (key in out && typeof value === "string") {
      out[key as Token] = value
    }
  }
  return out
}

const withExample = (
  defaults: Record<Token, string>,
  example: Record<string, string>,
) =>
  Object.fromEntries(
    TOKENS.map((token) => [token, example[token] ?? defaults[token]]),
  ) as Record<Token, string>

function isGraysEnabled(config: ModeConfig): boolean {
  return config["enable-grays"] !== "false"
}

const rule = (
  selector: string,
  tokens: readonly (readonly [string, string])[],
  indent = "  ",
) =>
  tokens.length > 0
    ? `${indent}${selector} {\n${tokens
        .map(([name, value]) => `${indent}  ${name}: ${value};`)
        .join("\n")}\n${indent}}`
    : ""

export function generateCss({
  dark,
  light,
  example = {},
  knobs = {},
}: {
  dark: ModeConfig
  light: ModeConfig
  example?: Record<string, string>
  knobs?: Record<string, string>
}): string {
  const customPalette = [light, dark].some((config) =>
    PALETTE_KNOBS.some((knob) => knob in config),
  )
  const lightSnap = snapshotFor(
    light,
    withExample(tokenDefaults("light"), { ...knobs, ...example }),
  )
  const darkSnap = snapshotFor(
    dark,
    withExample(tokenDefaults("dark"), { ...knobs, ...example }),
  )
  const shipped = customPalette ? example : { ...knobs, ...example }
  const lightDefaults = withExample(tokenDefaults("light"), shipped)
  const darkDefaults = withExample(tokenDefaults("dark"), shipped)

  const lightTokens = TOKENS.filter(
    (token) => lightSnap[token] !== lightDefaults[token],
  )
  const darkTokens = TOKENS.filter(
    (token) =>
      darkSnap[token] !==
      (lightTokens.includes(token) ? lightSnap[token] : darkDefaults[token]),
  )
  const lightPairs = [
    ...Object.entries(example)
      .filter(
        ([token]) =>
          !customPalette ||
          (token !== "--ui-palette-source" && token !== "--ui-primary-source"),
      )
      .map(
        ([token, value]) =>
          [
            token,
            lightTokens.includes(token as Token)
              ? lightSnap[token as Token]
              : value,
          ] as const,
      ),
    ...lightTokens
      .filter((token) => !(token in example))
      .map((token) => [token, lightSnap[token]] as const),
  ]

  const grays = { light: isGraysEnabled(light), dark: isGraysEnabled(dark) }
  const rampTokens =
    grays.light && grays.dark
      ? []
      : GRAY_ROLES.map(
          ({ name, parts }) => [name, rampValue(parts, grays)] as const,
        )

  const darkPairs = darkTokens.map((token) => [token, darkSnap[token]] as const)
  const rules = [
    rule(":where(html)", lightPairs),
    rule(":where(html, .ui-palette, .ui-contrast-more)", rampTokens),
    rule(":where(html.ui-dark)", darkPairs),
    darkPairs.length > 0
      ? `  @media (prefers-color-scheme: dark) {\n${rule(":where(html:not(.ui-light))", darkPairs, "    ")}\n  }`
      : "",
  ].filter(Boolean)

  return rules.length > 0
    ? `${LAYERS}@layer theme.custom {\n${rules.join("\n\n")}\n}\n`
    : PLACEHOLDER_CSS
}

const LAYERS = `@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
@layer theme.palette, theme.base, theme.custom;

`

export const PLACEHOLDER_CSS = `${LAYERS}@layer theme.custom {
  /* Tweak the controls to generate your custom-theme.css */
}
`
