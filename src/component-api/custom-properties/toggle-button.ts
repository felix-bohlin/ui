import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current background. Set by the hover and selected states.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the focus ring animation. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "The font size. Defaults to `--ui-font-size-control`. Set by the size classes on the button or its group.",
    kind: "input",
  },
  "--_icon-size": {
    description: "Size of a direct child `svg`. Defaults to `--ui-icon-size`.",
    kind: "input",
  },
  "--_min-height": {
    description:
      "Height and minimum width. Set by the size classes on the button or its group.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the focus ring animation. `0` turns it off.",
    kind: "input",
  },
} satisfies CustomProperties
