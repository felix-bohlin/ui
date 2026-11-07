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
  "--_mark-bg-color": {
    description:
      "Color of the dot when `--ui-choice-checked` is `mark`: `--_accent` in light mode, and in dark mode `--_accent` lifted to at least `--ui-text-min-lightness` with its chroma capped at `--ui-text-max-chroma`, so it reads on the surface. Set on `input`.",
    kind: "output",
  },
  "--_on-accent": {
    description:
      "Color of the dot on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
} satisfies CustomProperties
