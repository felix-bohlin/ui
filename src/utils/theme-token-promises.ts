export type TokenPromise = {
  against: string
  ratio: 3 | 4.5
}

export const themeTokenPromises: Record<string, TokenPromise> = {
  "--ui-field-border-color": { against: "--ui-surface-default", ratio: 3 },
  "--ui-focus-ring-color": { against: "--ui-surface-default", ratio: 3 },
  "--ui-invalid-text": { against: "--ui-surface-default", ratio: 4.5 },
  "--ui-on-inverse": { against: "--ui-surface-inverse", ratio: 4.5 },
  "--ui-on-inverse-muted": { against: "--ui-surface-inverse", ratio: 4.5 },
  "--ui-on-primary": { against: "--ui-primary", ratio: 4.5 },
  "--ui-text-muted": { against: "--ui-surface-default", ratio: 4.5 },
  "--ui-text-strong": { against: "--ui-surface-default", ratio: 4.5 },
}

export const describePromise = ({ against, ratio }: TokenPromise) =>
  `Promises ${ratio}:1 against \`${against}\`, in light and dark mode and under more contrast.`
