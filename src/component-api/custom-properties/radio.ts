import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked circle. `SelectedItem` in forced colors, and `GrayText` there when disabled.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Border of the radio input. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, `--_accent` when checked and `--ui-invalid` when invalid. `CanvasText` in forced colors, and `GrayText` there when disabled. A focused radio draws `--ui-focus-border-color` instead when the theme sets it. Set on `input`.",
    kind: "output",
  },
  "--_border-width": {
    description:
      "Border width of the radio input: `--_rest-border-width`, or `--ui-focus-border-width` while focused when the theme sets a wider one. The dot reads `--_rest-border-width`, so it keeps its size. Set on `input`.",
    kind: "output",
  },
  "--_dot-radius": {
    description:
      "Radius of the checked dot, computed from `--_size` and `--_rest-border-width`.",
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
  "--_rest-border-width": {
    description:
      "Border width of the unfocused input: `--ui-choice-border-width`, or `--ui-field-border-width` when the theme leaves it unset. Set on `input`.",
    kind: "output",
  },
} satisfies CustomProperties
