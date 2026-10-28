import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked circle. `SelectedItem` in forced colors.",
    kind: "input",
  },
  "--_dot-radius": {
    description:
      "Radius of the dot: `0px`, and computed from `--_size` and `--ui-field-border-width` when checked. A registered `<length>`, so the dot grows and shrinks over `--_duration`.",
    kind: "output",
  },
  "--_on-accent": {
    description:
      "Color of the dot on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
} satisfies CustomProperties
