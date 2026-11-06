import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked circle. `SelectedItem` in forced colors.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Border of the radio input. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, `--_accent` when checked and `--ui-invalid` when invalid. `CanvasText` in forced colors. A focused radio draws `--ui-focus-border-color` instead when the theme sets it. Set on `input`.",
    kind: "output",
  },
  "--_dot-radius": {
    description:
      "Radius of the checked dot, computed from `--_size` and `--ui-field-border-width`.",
    kind: "output",
  },
  "--_on-accent": {
    description:
      "Color of the dot on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
} satisfies CustomProperties
