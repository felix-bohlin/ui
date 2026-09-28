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

import {
  TOKEN_DEFAULTS,
  type ModeConfig,
  type Token,
} from "../../utils/theme-store"

const PALETTE_TOKENS = [
  "--palette-hue",
  "--palette-chroma",
  "--palette-hue-rotate-by",
  "--gray-chroma",
  "--gray-hue",
] as const satisfies readonly Token[]

type Snapshot = Record<Token, string>

function snapshotFor(config: ModeConfig, defaults: Snapshot): Snapshot {
  const out = { ...defaults }
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

function paletteSource(snap: Snapshot): string {
  return `oklch(0.58 calc(0.21 * ${snap["--palette-chroma"]}) ${snap["--palette-hue"]})`
}

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
  "--primary-contrast": { gray: ["1", "1"], color: ["1", "1"] },
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

export function generateCss({
  light,
  dark,
  defaults = TOKEN_DEFAULTS,
  preset,
}: {
  light: ModeConfig
  dark: ModeConfig
  defaults?: Snapshot
  preset?: string
}): string {
  const lightSnap = snapshotFor(light, defaults)
  const darkSnap = snapshotFor(dark, defaults)
  const grays = { light: isGraysEnabled(light), dark: isGraysEnabled(dark) }
  const graysEnabled = grays.light || grays.dark
  const ramp = (token: keyof typeof RAMPS) =>
    `    ${token}: ${rampValue(RAMPS[token], grays)};`

  const palettesDiffer = PALETTE_TOKENS.some(
    (t) =>
      (t === "--palette-hue" || t === "--palette-chroma") &&
      darkSnap[t] !== lightSnap[t],
  )

  const paletteSourceValue = palettesDiffer
    ? `light-dark(${paletteSource(lightSnap)},\n        ${paletteSource(darkSnap)})`
    : paletteSource(lightSnap)

  const lines: string[] = []
  lines.push("/*")
  lines.push("  theme setup")
  if (preset) {
    lines.push("")
    lines.push(
      `  Tweaked on top of the "${preset}" docs preset. The preset itself`,
    )
    lines.push("  is not part of this file - grab it from the themes page.")
  }
  lines.push("*/")
  lines.push("@layer theme {")
  lines.push("")
  lines.push("  /* 1. Color scheme */")
  lines.push("  .ui-light {")
  lines.push("    --color-scheme: light;")
  lines.push("  }")
  lines.push("")
  lines.push("  .ui-dark {")
  lines.push("    --color-scheme: dark;")
  lines.push("  }")
  lines.push("")
  lines.push("  :where(html) {")
  lines.push("    color-scheme: var(--color-scheme, light dark);")
  lines.push("")
  lines.push(
    "    /* 2. Palette source - one value to rule them all. Every other color is derived from this one. */",
  )
  lines.push(`    --palette-source: ${paletteSourceValue};`)
  lines.push(
    `    --palette-hue-rotate-by: ${lightSnap["--palette-hue-rotate-by"]};`,
  )
  lines.push("")

  if (graysEnabled) {
    lines.push(
      "    /* Gray ramp - derived per-element by core/palette.css. Override --gray-chroma",
    )
    lines.push("       or --gray-hue here for warmer/cooler grays. */")
    lines.push(`    --gray-chroma: ${lightSnap["--gray-chroma"]};`)
    lines.push(`    --gray-hue: ${lightSnap["--gray-hue"]};`)
    lines.push("")
  }

  lines.push(
    "    /* 3. Named colors (no severity meaning) - use when you literally want a green/red/etc. dot */",
  )
  lines.push("    --blue: oklch(from var(--color-9) l 0.2 210);")
  lines.push("    --green: oklch(from var(--color-9) l 0.2 145);")
  lines.push("    --orange: oklch(from var(--color-7) l 0.2 75);")
  lines.push("    --red: oklch(from var(--color-9) l 0.2 25);")
  lines.push("")
  lines.push("    /* 4. Intent tokens")
  lines.push(
    "       Severity (have scope classes below): --success, --info, --warning, --critical",
  )
  lines.push(
    "       Non-severity (value-only):           --primary, --neutral */",
  )
  lines.push("    --success: var(--green);")
  lines.push("    --info: var(--blue);")
  lines.push("    --warning: var(--orange);")
  lines.push("    --critical: var(--red);")
  lines.push(ramp("--neutral"))
  lines.push("")
  lines.push("    /* 5. Primary */")
  lines.push("    --primary: var(--color-8);")
  lines.push(
    "    --primary-light: oklch(from var(--primary) calc(l * 1.25) c h);",
  )
  lines.push(
    "    --primary-dark: oklch(from var(--primary) calc(l * 0.75) c h);",
  )
  lines.push(ramp("--primary-contrast"))
  lines.push("")
  lines.push("    /* 6. Text */")
  lines.push(ramp("--text-primary"))
  lines.push(ramp("--text-primary-contrast"))
  lines.push(ramp("--text-muted"))
  lines.push(ramp("--text-muted-contrast"))
  lines.push("")
  lines.push("    /* 7. Surfaces */")
  lines.push(ramp("--surface-default"))
  lines.push(ramp("--surface-filled"))
  lines.push(ramp("--surface-tonal"))
  lines.push(ramp("--surface-elevated"))
  lines.push("")
  lines.push("    /* 8. Borders */")
  lines.push(ramp("--border-color"))
  lines.push(`    --border-radius: ${lightSnap["--border-radius"]};`)
  lines.push("    --border-width: 1px;")
  lines.push("")
  lines.push(
    "    /* 9. Focus ring - components consume these and may override locally */",
  )
  lines.push("    /* --focus-ring-color: var(--primary); */")
  lines.push("    --focus-ring-width: 2px;")
  lines.push("    --focus-ring-offset: 2px;")
  lines.push("    --focus-ring-style: solid;")
  lines.push("")
  lines.push("    /* 10. Typography */")
  lines.push("    --font-size-h1: var(--font-size-fluid-3);")
  lines.push("    --font-size-h2: var(--font-size-fluid-2);")
  lines.push("    --font-size-h3: var(--font-size-fluid-1);")
  lines.push("    --font-size-h4: var(--font-size-3);")
  lines.push("    --font-size-h5: var(--font-size-2);")
  lines.push("    --font-size-h6: var(--font-size-fluid-0);")
  lines.push("    --font-size-05: 0.875rem;")
  lines.push("")
  lines.push(
    "    /* 11. Control sizes - shared scale for fields and buttons. */",
  )
  lines.push("    --control-size-x-small: 28px;")
  lines.push("    --control-size-small: 32px;")
  lines.push("    --control-size: 40px;")
  lines.push("    --control-size-large: 46px;")
  lines.push("")
  lines.push("    --field-size-x-small: var(--control-size-x-small);")
  lines.push("    --field-size-small: var(--control-size-small);")
  lines.push("    --field-size: var(--control-size);")
  lines.push("    --field-size-large: var(--control-size-large);")
  lines.push("")
  lines.push("    --button-size-x-small: var(--control-size-x-small);")
  lines.push("    --button-size-small: var(--control-size-small);")
  lines.push("    --button-size: var(--control-size);")
  lines.push("    --button-size-large: var(--control-size-large);")
  lines.push("")
  lines.push("    /* 12. Field / input */")

  lines.push("    --field-border-color: var(--border-color);")
  lines.push(
    `    --field-border-radius: ${lightSnap["--field-border-radius"]};`,
  )
  lines.push("    --field-border-width: 1px;")
  lines.push("")
  lines.push("    /* 13. Button */")
  lines.push(
    `    --button-border-radius: ${lightSnap["--button-border-radius"]};`,
  )
  lines.push("  }")

  // .dark overrides for tokens that differ between modes (palette-source is
  // already handled via light-dark() above, so we only emit non-palette
  // overrides here).
  const darkOverrides: string[] = []
  if (
    darkSnap["--palette-hue-rotate-by"] !== lightSnap["--palette-hue-rotate-by"]
  ) {
    darkOverrides.push(
      `    --palette-hue-rotate-by: ${darkSnap["--palette-hue-rotate-by"]};`,
    )
  }
  if (grays.dark) {
    if (darkSnap["--gray-chroma"] !== lightSnap["--gray-chroma"]) {
      darkOverrides.push(`    --gray-chroma: ${darkSnap["--gray-chroma"]};`)
    }
    if (darkSnap["--gray-hue"] !== lightSnap["--gray-hue"]) {
      darkOverrides.push(`    --gray-hue: ${darkSnap["--gray-hue"]};`)
    }
  }
  if (darkSnap["--border-radius"] !== lightSnap["--border-radius"]) {
    darkOverrides.push(`    --border-radius: ${darkSnap["--border-radius"]};`)
  }
  if (
    darkSnap["--field-border-radius"] !== lightSnap["--field-border-radius"]
  ) {
    darkOverrides.push(
      `    --field-border-radius: ${darkSnap["--field-border-radius"]};`,
    )
  }
  if (
    darkSnap["--button-border-radius"] !== lightSnap["--button-border-radius"]
  ) {
    darkOverrides.push(
      `    --button-border-radius: ${darkSnap["--button-border-radius"]};`,
    )
  }

  if (darkOverrides.length > 0) {
    lines.push("")
    lines.push("  .ui-dark {")
    lines.push(...darkOverrides)
    lines.push("  }")
    lines.push("")
    lines.push("  @media (prefers-color-scheme: dark) {")
    lines.push("    :where(html:not(.ui-light)) {")
    lines.push(...darkOverrides.map((line) => `  ${line}`))
    lines.push("    }")
    lines.push("  }")
  }

  lines.push("")
  lines.push(
    "  /* 14. Severity scope classes - re-source the palette inside these contexts. */",
  )
  lines.push("  :where(.ui-critical, [data-invalid], del) {")
  lines.push("    --palette-source: oklch(0.58 0.21 var(--hue-red));")
  lines.push("    --palette-hue-rotate-by: 1;")
  lines.push("  }")
  lines.push("")
  lines.push("  :where(.ui-info, abbr, dfn) {")
  lines.push("    --palette-source: oklch(0.58 0.21 var(--hue-blue));")
  lines.push("    --palette-hue-rotate-by: 1;")
  lines.push("  }")
  lines.push("")
  lines.push("  :where(.ui-success, ins) {")
  lines.push("    --palette-source: oklch(0.58 0.21 var(--hue-green));")
  lines.push("    --palette-hue-rotate-by: 1;")
  lines.push("  }")
  lines.push("")
  lines.push("  :where(.ui-warning) {")
  lines.push("    --palette-source: oklch(0.58 0.21 var(--hue-orange));")
  lines.push("    --palette-hue-rotate-by: 1;")
  lines.push("  }")
  lines.push("}")

  return lines.join("\n")
}

export const PLACEHOLDER_CSS = `@layer theme {
  /* Tweak the controls to generate your theme.css */
}`
