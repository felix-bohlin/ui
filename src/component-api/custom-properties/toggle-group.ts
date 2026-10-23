import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "Background of the group. Defaults to `--ui-surface`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the outline around the group and the lines between buttons. Defaults to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the group. Defaults to `--ui-button-radius`, capped at half a button height so a round radius doesn't clip the end items.",
    kind: "input",
  },
} satisfies CustomProperties
