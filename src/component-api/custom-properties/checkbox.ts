import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border of the checkbox input. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, `--_accent` when checked or indeterminate and `--ui-invalid` when invalid. A focused checkbox draws `--ui-focus-border-color` instead when the theme sets it. Set on `input`.",
    kind: "output",
  },
} satisfies CustomProperties
