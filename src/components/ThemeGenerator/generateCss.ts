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
 *  - A reference theme's tokens come first, and the other tokens only when
 *    they differ from it.
 *  - With grays disabled, the text, surface and border mappings go in
 *    `:where(html, .ui-palette)`, like in theme.css.
 */

import {
  TOKENS,
  tokenDefaults,
  type ModeConfig,
  type Token,
} from "../../utils/theme-store"

type Snapshot = Record<Token, string>

type Ramp = { gray: [string, string]; color: [string, string] }

const RAMPS = {
  "--ui-text-primary": { gray: ["15", "1"], color: ["15", "1"] },
  "--ui-text-inverse": { gray: ["1", "15"], color: ["1", "15"] },
  "--ui-text-muted": { gray: ["13", "4"], color: ["13", "4"] },
  "--ui-text-muted-contrast": { gray: ["4", "13"], color: ["4", "13"] },
  "--ui-surface-default": { gray: ["1", "13"], color: ["1", "14"] },
  "--ui-surface-filled": { gray: ["4", "15"], color: ["5", "16"] },
  "--ui-surface-tonal": { gray: ["3", "12"], color: ["4", "12"] },
  "--ui-surface-elevated": { gray: ["1", "12"], color: ["1", "12"] },
  "--ui-border-color": { gray: ["4", "12"], color: ["4", "12"] },
  "--ui-neutral": { gray: ["9", "9"], color: ["9", "9"] },
} satisfies Record<string, Ramp>

function rampValue(ramp: Ramp, grays: { light: boolean; dark: boolean }) {
  const light = grays.light
    ? `--ui-gray-${ramp.gray[0]}`
    : `--ui-color-${ramp.color[0]}`
  const dark = grays.dark
    ? `--ui-gray-${ramp.gray[1]}`
    : `--ui-color-${ramp.color[1]}`
  return light === dark
    ? `var(${light})`
    : `light-dark(var(${light}), var(${dark}))`
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

const withReference = (
  defaults: Record<Token, string>,
  reference: Record<string, string>,
) =>
  Object.fromEntries(
    TOKENS.map((token) => [token, reference[token] ?? defaults[token]]),
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
  reference = {},
}: {
  dark: ModeConfig
  light: ModeConfig
  reference?: Record<string, string>
}): string {
  const lightDefaults = withReference(tokenDefaults("light"), reference)
  const darkDefaults = withReference(tokenDefaults("dark"), reference)
  const lightSnap = snapshotFor(light, lightDefaults)
  const darkSnap = snapshotFor(dark, darkDefaults)

  const lightTokens = TOKENS.filter(
    (token) => lightSnap[token] !== lightDefaults[token],
  )
  const darkTokens = TOKENS.filter(
    (token) =>
      darkSnap[token] !==
      (lightTokens.includes(token) ? lightSnap[token] : darkDefaults[token]),
  )
  const lightPairs = [
    ...Object.entries(reference).map(
      ([token, value]) =>
        [
          token,
          lightTokens.includes(token as Token)
            ? lightSnap[token as Token]
            : value,
        ] as const,
    ),
    ...lightTokens
      .filter((token) => !(token in reference))
      .map((token) => [token, lightSnap[token]] as const),
  ]

  const grays = { light: isGraysEnabled(light), dark: isGraysEnabled(dark) }
  const rampTokens =
    grays.light && grays.dark
      ? []
      : Object.entries(RAMPS).map(
          ([name, ramp]) => [name, rampValue(ramp, grays)] as const,
        )

  const darkPairs = darkTokens.map((token) => [token, darkSnap[token]] as const)
  const rules = [
    rule(":where(html)", lightPairs),
    rule(":where(html, .ui-palette)", rampTokens),
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
