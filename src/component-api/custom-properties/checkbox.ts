import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border of the checkbox input. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, `--_accent` when checked or indeterminate and `--ui-invalid` when invalid. A focused checkbox draws `--ui-focus-border-color` instead when the theme sets it. Set on `input`.",
    kind: "output",
  },
  "--_border-width": {
    description:
      "Border width of the checkbox input: `--ui-field-border-width`, or `--ui-focus-border-width` while focused when the theme sets a wider one. The check is inset by the difference from `--ui-field-border-width`, so it keeps its size. Set on `input`.",
    kind: "output",
  },
  "--_mark-bg-color": {
    description:
      "Color of the check and the indeterminate dash when `--ui-choice-checked` is `mark`: `--_accent` in light mode, and in dark mode `--_accent` lifted to at least `--ui-text-min-lightness` with its chroma capped at `--ui-text-max-chroma`, so it reads on the surface. Set on `input`.",
    kind: "output",
  },
} satisfies CustomProperties
