import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "Background of the group. Defaults to `--surface-default`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the outline around the group and the lines between buttons. Defaults to `--border-color`.",
    kind: "input",
  },
  "--_border-radius": {
    description:
      "Corner radius of the group. Defaults to `--button-border-radius`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "Font size of each toggle button. Set by the group's size classes.",
    kind: "input",
  },
  "--_size": {
    description:
      "Height and minimum width of each toggle button. Set by the group's size classes.",
    kind: "input",
  },
} satisfies CustomProperties
