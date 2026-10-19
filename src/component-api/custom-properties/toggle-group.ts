import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "Background of the group. Defaults to `--ui-surface-default`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the outline around the group and the lines between buttons. Defaults to `--ui-border-color`.",
    kind: "input",
  },
  "--_border-radius": {
    description:
      "Corner radius of the group. Defaults to `--ui-button-border-radius`.",
    kind: "input",
  },
} satisfies CustomProperties
