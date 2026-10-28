import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current background. Set by the hover and selected states.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the hover and selected transitions and the focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the hover and selected transitions and the focus ring animation. Defaults to `--ui-ease`.",
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
  "--_motion": {
    description:
      "Motion multiplier for the hover and selected transitions and the focus ring animation. `0` turns them off.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      "Background of the checked button. `--ui-selected` when the theme sets it, otherwise `--ui-primary`.",
    kind: "input",
  },
  "--_size": {
    description:
      "Height and minimum width. Defaults to `--ui-button-size`, set by the size classes on the button or its group.",
    kind: "input",
  },
} satisfies CustomProperties
