export type TokenPromise = {
  against: string
  ratio: 3 | 4.5
}

export const themeTokenPromises: Record<string, TokenPromise> = {
  "--ui-field-border-color": { against: "--ui-surface-default", ratio: 3 },
  "--ui-focus-ring-color": { against: "--ui-surface-default", ratio: 3 },
  "--ui-invalid-text-color": { against: "--ui-surface-default", ratio: 4.5 },
  "--ui-primary-contrast": { against: "--ui-primary", ratio: 4.5 },
  "--ui-text-inverse": { against: "--ui-surface-inverse", ratio: 4.5 },
  "--ui-text-muted": { against: "--ui-surface-default", ratio: 4.5 },
  "--ui-text-muted-contrast": { against: "--ui-surface-inverse", ratio: 4.5 },
  "--ui-text-primary": { against: "--ui-surface-default", ratio: 4.5 },
}

export const describePromise = ({ against, ratio }: TokenPromise) =>
  `Promises ${ratio}:1 against \`${against}\`, in light and dark mode and under more contrast.`
