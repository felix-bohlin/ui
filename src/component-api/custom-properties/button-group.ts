import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description: "Border color of each button, `transparent` in a group.",
    kind: "output",
  },
  "--_border-radius": {
    description:
      "Corner radius of the group. Defaults to `--ui-button-border-radius`.",
    kind: "input",
  },
  "--_divider-color": {
    description:
      "Color of the lines between buttons, from the button's `--_accent-tonal`, `--_accent` in `.ui-outlined` and `currentColor` in `.ui-filled`.",
    kind: "output",
  },
  "--_edge-accent": {
    description:
      "Outline color of `.ui-outlined`. `.ui-primary` and `.ui-critical` set it.",
    kind: "input",
  },
  "--_edge-color": {
    description:
      "The current outline color around the group. `transparent`, or `--_edge-accent` in `.ui-outlined`.",
    kind: "output",
  },
} satisfies CustomProperties
