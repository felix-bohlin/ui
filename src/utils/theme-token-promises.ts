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

export const THEME_EXCEPTIONS: Record<
  string,
  Partial<Record<"dark" | "light", Record<string, string>>>
> = {
  bootstrap: {
    dark: {
      "--ui-choice-border-color":
        "Bootstrap draws its checks with its 1.9:1 border color",
      "--ui-field-border-color":
        "Bootstrap draws its form controls with its 1.9:1 border color",
      "--ui-focus-ring-color":
        "Bootstrap draws its focus ring at 25% of its primary blue",
    },
    light: {
      "--ui-choice-border-color":
        "Bootstrap draws its checks with its 1.3:1 border color",
      "--ui-field-border-color":
        "Bootstrap draws its form controls with its 1.3:1 border color",
      "--ui-focus-ring-color":
        "Bootstrap draws its focus ring at 25% of its primary blue",
    },
  },
  brutalist: {
    dark: {
      "--ui-choice-border-color":
        "neobrutalism keeps its black borders on the dark surface",
      "--ui-field-border-color":
        "neobrutalism keeps its black borders on the dark surface",
    },
    light: {
      "--ui-selected-strong":
        "neobrutalism marks the selected item with its light main color",
    },
  },
  shadcn: {
    dark: {
      "--ui-field-border-color":
        "shadcn/ui draws its dark inputs with a 15% white border",
      "--ui-focus-ring-color":
        "shadcn/ui draws its dark focus ring at 50% of a mid gray",
    },
    light: {
      "--ui-field-border-color":
        "shadcn/ui draws its inputs with a 1.26:1 border",
      "--ui-focus-ring-color":
        "shadcn/ui draws its focus ring at 50% of a light gray",
    },
  },
}

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
  "--ui-on-fill": {
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
