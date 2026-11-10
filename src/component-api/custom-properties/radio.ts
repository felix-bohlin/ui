import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked circle. `SelectedItem` in forced colors, and `GrayText` there when disabled.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Border of the radio input. `choice.css` sets the default, `--_accent` when checked and `--ui-invalid` when invalid, and `GrayText` in forced colors when disabled. Set on `input`.",
    kind: "output",
  },
  "--_dot-radius": {
    description:
      "Radius of the checked dot, computed from `--_size` and `--_rest-border-width`, so the dot keeps its size when a focused radio's border grows.",
    kind: "output",
  },
  "--_on-accent": {
    description:
      "Color of the dot on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
} satisfies CustomProperties
