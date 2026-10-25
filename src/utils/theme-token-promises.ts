export type TokenPromise = {
  against: string[]
  fallback?: string
  ratio: 3 | 4.5
}

const SURFACES = [
  "--ui-surface",
  "--ui-surface-elevated",
  "--ui-surface-filled",
  "--ui-surface-tonal",
]

const accentFill = (intent: string) =>
  `oklch(from var(${intent}) min(l, var(--ui-accent-fill-max-lightness)) c h)`

export const themeTokenPromises: Record<string, TokenPromise> = {
  "--ui-choice-border-color": {
    against: ["--ui-surface"],
    fallback: "--ui-field-border-color",
    ratio: 3,
  },
  "--ui-code-block-text-color": {
    against: ["--ui-code-block-bg-color"],
    ratio: 4.5,
  },
  "--ui-critical-text": { against: SURFACES, ratio: 4.5 },
  "--ui-field-border-color": { against: ["--ui-surface"], ratio: 3 },
  "--ui-field-helper-text-color": { against: SURFACES, ratio: 4.5 },
  "--ui-field-label-text-color": { against: SURFACES, ratio: 4.5 },
  "--ui-field-required-text-color": { against: SURFACES, ratio: 4.5 },
  "--ui-focus-ring-color": { against: ["--ui-surface"], ratio: 3 },
  "--ui-info-text": { against: SURFACES, ratio: 4.5 },
  "--ui-invalid-text": { against: SURFACES, ratio: 4.5 },
  "--ui-neutral-text": { against: SURFACES, ratio: 4.5 },
  "--ui-on-accent": {
    against: ["--ui-critical", "--ui-info", "--ui-neutral", "--ui-success"].map(
      accentFill,
    ),
    ratio: 4.5,
  },
  "--ui-on-inverse": { against: ["--ui-surface-inverse"], ratio: 4.5 },
  "--ui-on-primary": { against: ["--ui-primary"], ratio: 4.5 },
  "--ui-on-selected-strong": { against: ["--ui-selected-strong"], ratio: 4.5 },
  "--ui-on-warning": { against: ["--ui-warning"], ratio: 4.5 },
  "--ui-palette-on-strong": { against: ["--ui-palette-strong"], ratio: 4.5 },
  "--ui-palette-on-tint": { against: ["--ui-palette-tint"], ratio: 4.5 },
  "--ui-palette-text": { against: SURFACES, ratio: 4.5 },
  "--ui-primary-text": { against: SURFACES, ratio: 4.5 },
  "--ui-selected-strong": { against: ["--ui-surface"], ratio: 3 },
  "--ui-success-text": { against: SURFACES, ratio: 4.5 },
  "--ui-text": { against: ["--ui-surface"], ratio: 4.5 },
  "--ui-text-strong": { against: ["--ui-surface"], ratio: 4.5 },
  "--ui-text-subtle": { against: ["--ui-surface"], ratio: 4.5 },
  "--ui-warning-text": { against: SURFACES, ratio: 4.5 },
}

export const promiseColor = (value: string) =>
  value.startsWith("--") ? `var(${value})` : value

export const describePromise = ({ against, ratio }: TokenPromise) =>
  `Promises ${ratio}:1 against ${new Intl.ListFormat("en").format(against.map((name) => `\`${name}\``))}, in light and dark mode and under more contrast.`
