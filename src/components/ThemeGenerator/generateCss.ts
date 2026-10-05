/**
 * Pure function that turns the saved per-mode configs into a copy-pasteable
 * `theme.css` snippet. The shape of the output mirrors
 * `packages/opui/css/theme.css` so consumers can drop it in
 * place. Tunable values (palette, grays, radii, enable-grays) get inlined;
 * the rest of the theme structure (named colors, intent tokens, primary
 * variants, text/surface mappings, focus ring, typography, control sizes,
 * field/button tokens, and severity scope classes) is emitted verbatim.
 *
 * Per-mode differences:
 *  - `--palette-source` is wrapped in `light-dark()` when the modes diverge.
 *  - Other tokens (`--palette-hue-rotate-by`, `--gray-chroma`, `--gray-hue`,
 *    radii) get a `.dark { ... }` override block when they differ.
 */

import themeSource from "@opui/css/theme.css?raw"
import {
  TOKENS,
  tokenDefaults,
  type Mode,
  type ModeConfig,
  type Token,
} from "../../utils/theme-store"
import { setDarkThemeTokens, setThemeToken } from "../../utils/theme-tokens"

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

export function generateCss({
  light,
  dark,
}: {
  light: ModeConfig
  dark: ModeConfig
}): string {
  const lightSnap = snapshotFor("light", light)
  const darkSnap = snapshotFor("dark", dark)

  let css = themeSource
  for (const token of TOKENS) {
    css = setThemeToken(css, token, lightSnap[token])
  }

  const overrides = TOKENS.filter(
    (token) => darkSnap[token] !== lightSnap[token],
  ).map((token) => [token, darkSnap[token]] as const)
  css = setDarkThemeTokens(
    css,
    overrides.length > 0
      ? overrides
      : [["--palette-hue", darkSnap["--palette-hue"]]],
  )

  const grays = { light: isGraysEnabled(light), dark: isGraysEnabled(dark) }
  if (!grays.light || !grays.dark) {
    for (const [name, ramp] of Object.entries(RAMPS)) {
      css = setThemeToken(css, name, rampValue(ramp, grays))
    }
  }

  return css
}

export const PLACEHOLDER_CSS = `@layer theme {
  /* Tweak the controls to generate your theme.css */
}`
