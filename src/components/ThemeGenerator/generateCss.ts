/**
 * Pure function that turns the saved per-mode configs into a copy-pasteable
 * `brand.css` snippet. It only holds the tokens that differ from what
 * `packages/opui/css/theme.css` ships, in the `theme.brand` layer, so it
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
 *  - With grays disabled, the text, surface and border mappings go in
 *    `:where(html, .ui-palette)`, like in theme.css.
 */

import {
  TOKENS,
  tokenDefaults,
  type Mode,
  type ModeConfig,
  type Token,
} from "../../utils/theme-store"

type Snapshot = Record<Token, string>

type Ramp = { gray: [string, string]; color: [string, string] }

const RAMPS = {
  "--text-primary": { gray: ["15", "1"], color: ["15", "1"] },
  "--text-primary-contrast": { gray: ["2", "15"], color: ["2", "15"] },
  "--text-muted": { gray: ["13", "4"], color: ["13", "4"] },
  "--text-muted-contrast": { gray: ["4", "13"], color: ["4", "13"] },
  "--surface-default": { gray: ["1", "13"], color: ["1", "14"] },
  "--surface-filled": { gray: ["4", "15"], color: ["5", "16"] },
  "--surface-tonal": { gray: ["3", "12"], color: ["4", "12"] },
  "--surface-elevated": { gray: ["1", "12"], color: ["1", "12"] },
  "--border-color": { gray: ["4", "12"], color: ["4", "12"] },
  "--neutral": { gray: ["9", "9"], color: ["9", "9"] },
} satisfies Record<string, Ramp>

function rampValue(ramp: Ramp, grays: { light: boolean; dark: boolean }) {
  const light = grays.light
    ? `--gray-${ramp.gray[0]}`
    : `--color-${ramp.color[0]}`
  const dark = grays.dark
    ? `--gray-${ramp.gray[1]}`
    : `--color-${ramp.color[1]}`
  return light === dark
    ? `var(${light})`
    : `light-dark(var(${light}), var(${dark}))`
}

function snapshotFor(mode: Mode, config: ModeConfig): Snapshot {
  const out = { ...tokenDefaults(mode) }
  for (const [key, value] of Object.entries(config)) {
    if (key in out && typeof value === "string") {
      out[key as Token] = value
    }
  }
  return out
}

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
  light,
  dark,
}: {
  light: ModeConfig
  dark: ModeConfig
}): string {
  const lightSnap = snapshotFor("light", light)
  const darkSnap = snapshotFor("dark", dark)
  const lightDefaults = tokenDefaults("light")
  const darkDefaults = tokenDefaults("dark")

  const lightTokens = TOKENS.filter(
    (token) => lightSnap[token] !== lightDefaults[token],
  )
  const darkTokens = TOKENS.filter(
    (token) =>
      darkSnap[token] !==
      (lightTokens.includes(token) ? lightSnap[token] : darkDefaults[token]),
  )

  const grays = { light: isGraysEnabled(light), dark: isGraysEnabled(dark) }
  const rampTokens =
    grays.light && grays.dark
      ? []
      : Object.entries(RAMPS).map(
          ([name, ramp]) => [name, rampValue(ramp, grays)] as const,
        )

  const darkPairs = darkTokens.map((token) => [token, darkSnap[token]] as const)
  const rules = [
    rule(
      ":where(html)",
      lightTokens.map((token) => [token, lightSnap[token]] as const),
    ),
    rule(":where(html, .ui-palette)", rampTokens),
    rule(":where(html.ui-dark)", darkPairs),
    darkPairs.length > 0
      ? `  @media (prefers-color-scheme: dark) {\n${rule(":where(html:not(.ui-light))", darkPairs, "    ")}\n  }`
      : "",
  ].filter(Boolean)

  return rules.length > 0
    ? `${LAYERS}@layer theme.brand {\n${rules.join("\n\n")}\n}\n`
    : PLACEHOLDER_CSS
}

const LAYERS = `@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
@layer theme.palette, theme.base, theme.brand;

`

export const PLACEHOLDER_CSS = `${LAYERS}@layer theme.brand {
  /* Tweak the controls to generate your brand.css */
}
`
