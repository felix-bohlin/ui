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

function snapshotFor(config: ModeConfig): Snapshot {
  const out = { ...TOKEN_DEFAULTS }
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

export function generateCss({
  light,
  dark,
}: {
  light: ModeConfig
  dark: ModeConfig
}): string {
  const lightSnap = snapshotFor(light)
  const darkSnap = snapshotFor(dark)
  const graysEnabled = isGraysEnabled(light)

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
      "    /* Gray ramp — derived per-element by core/palette.css. Override --gray-chroma",
    )
    lines.push("       or --gray-hue here for warmer/cooler grays. */")
    lines.push(`    --gray-chroma: ${lightSnap["--gray-chroma"]};`)
    lines.push(`    --gray-hue: ${lightSnap["--gray-hue"]};`)
    lines.push("")
  }

  lines.push(
    "    /* 3. Named colors (no severity meaning) — use when you literally want a green/red/etc. dot */",
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
  lines.push(`    --neutral: var(${graysEnabled ? "--gray-9" : "--color-9"});`)
  lines.push("")
  lines.push("    /* 5. Primary */")
  lines.push("    --primary: var(--color-8);")
  lines.push(
    "    --primary-light: oklch(from var(--primary) calc(l * 1.25) c h);",
  )
  lines.push(
    "    --primary-dark: oklch(from var(--primary) calc(l * 0.75) c h);",
  )
  lines.push(
    `    --primary-contrast: var(${graysEnabled ? "--gray-1" : "--color-1"});`,
  )
  lines.push("")
  lines.push("    /* 6. Text */")

  if (graysEnabled) {
    lines.push("    --text-primary: light-dark(var(--gray-15), var(--gray-1));")
    lines.push(
      "    --text-primary-contrast: light-dark(var(--gray-2), var(--gray-15));",
    )
    lines.push("    --text-muted: light-dark(var(--gray-13), var(--gray-4));")
    lines.push(
      "    --text-muted-contrast: light-dark(var(--gray-4), var(--gray-13));",
    )
  } else {
    lines.push(
      "    --text-primary: light-dark(var(--color-15), var(--color-1));",
    )
    lines.push(
      "    --text-primary-contrast: light-dark(var(--color-2), var(--color-15));",
    )
    lines.push("    --text-muted: light-dark(var(--color-13), var(--color-4));")
    lines.push(
      "    --text-muted-contrast: light-dark(var(--color-4), var(--color-13));",
    )
  }

  lines.push("")
  lines.push("    /* 7. Surfaces */")

  if (graysEnabled) {
    lines.push(
      "    --surface-default: light-dark(var(--gray-1), var(--gray-13));",
    )
    lines.push(
      "    --surface-filled: light-dark(var(--gray-4), var(--gray-15));",
    )
    lines.push(
      "    --surface-tonal: light-dark(var(--gray-3), var(--gray-12));",
    )
    lines.push(
      "    --surface-elevated: light-dark(var(--gray-1), var(--gray-12));",
    )
  } else {
    lines.push(
      "    --surface-default: light-dark(var(--color-1), var(--color-14));",
    )
    lines.push(
      "    --surface-filled: light-dark(var(--color-5), var(--color-16));",
    )
    lines.push(
      "    --surface-tonal: light-dark(var(--color-4), var(--color-12));",
    )
    lines.push(
      "    --surface-elevated: light-dark(var(--color-1), var(--color-12));",
    )
  }

  lines.push("")
  lines.push("    /* 8. Borders */")

  if (graysEnabled) {
    lines.push("    --border-color: light-dark(var(--gray-4), var(--gray-12));")
  } else {
    lines.push(
      "    --border-color: light-dark(var(--color-4), var(--color-12));",
    )
  }

  lines.push(`    --border-radius: ${lightSnap["--border-radius"]};`)
  lines.push("    --border-width: 1px;")
  lines.push("")
  lines.push(
    "    /* 9. Focus ring — components consume these and may override locally */",
  )
  lines.push("    --focus-ring-color: var(--primary);")
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
    "    /* 11. Control sizes — shared scale for fields and buttons. */",
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

  if (graysEnabled) {
    lines.push("    --field-border-color: var(--border-color);")
  } else {
    lines.push(
      "    --field-border-color: light-dark(var(--color-4), var(--color-12));",
    )
  }

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
  if (graysEnabled) {
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
  }

  lines.push("")
  lines.push(
    "  /* 14. Severity scope classes — re-source the palette inside these contexts. */",
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
