export type TokenPromise = {
  against: string[]
  ratio: 3 | 4.5
}

const SURFACES = [
  "--ui-surface-default",
  "--ui-surface-elevated",
  "--ui-surface-filled",
  "--ui-surface-tonal",
]

export const themeTokenPromises: Record<string, TokenPromise> = {
  "--ui-critical-text": { against: SURFACES, ratio: 4.5 },
  "--ui-field-border-color": { against: ["--ui-surface-default"], ratio: 3 },
  "--ui-focus-ring-color": { against: ["--ui-surface-default"], ratio: 3 },
  "--ui-info-text": { against: SURFACES, ratio: 4.5 },
  "--ui-invalid-text": { against: SURFACES, ratio: 4.5 },
  "--ui-neutral-text": { against: SURFACES, ratio: 4.5 },
  "--ui-on-inverse": { against: ["--ui-surface-inverse"], ratio: 4.5 },
  "--ui-on-inverse-muted": { against: ["--ui-surface-inverse"], ratio: 4.5 },
  "--ui-on-primary": { against: ["--ui-primary"], ratio: 4.5 },
  "--ui-on-selected-strong": { against: ["--ui-selected-strong"], ratio: 4.5 },
  "--ui-on-warning": { against: ["--ui-warning"], ratio: 4.5 },
  "--ui-primary-text": { against: SURFACES, ratio: 4.5 },
  "--ui-selected-strong": { against: ["--ui-surface-default"], ratio: 3 },
  "--ui-success-text": { against: SURFACES, ratio: 4.5 },
  "--ui-text-muted": { against: ["--ui-surface-default"], ratio: 4.5 },
  "--ui-text-strong": { against: ["--ui-surface-default"], ratio: 4.5 },
  "--ui-warning-text": { against: SURFACES, ratio: 4.5 },
}

export const describePromise = ({ against, ratio }: TokenPromise) =>
  `Promises ${ratio}:1 against ${new Intl.ListFormat("en").format(against.map((name) => `\`${name}\``))}, in light and dark mode and under more contrast.`
