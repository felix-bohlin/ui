import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked circle. `SelectedItem` in forced colors.",
    kind: "input",
  },
  "--_accent-contrast": {
    description:
      "Color of the dot on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
  "--_dot-radius": {
    description:
      "Radius of the checked dot, computed from `--_input-size` and `--field-border-width`.",
    kind: "output",
  },
} satisfies CustomProperties
