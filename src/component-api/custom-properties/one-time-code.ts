import type { CustomProperties } from "../types"

export default {
  "--_box-focus-image": {
    description:
      "The thicker box mask every box gets while the field has focus in browsers without `field-sizing`.",
    kind: "input",
  },
  "--_box-image": {
    description: "The box mask, repeated once per character.",
    kind: "input",
  },
  "--_cell-size": {
    description:
      "Width of one box: `--_max-cell-size`, or less when the container is narrower than every box side by side.",
    kind: "output",
  },
  "--_dash-bg-color": {
    description:
      "Color of the dash between the two halves with `.ui-grouped`. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
  "--_dash-block-size": {
    description:
      "Thickness of the dash. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_dash-image": {
    description:
      "The dash between the two halves, set by `.ui-grouped`. Defaults to none.",
    kind: "output",
  },
  "--_font-size": {
    description:
      "Font size of the code. Defaults to `--ui-font-size-large`, `--ui-font-size-body` with `.ui-small` and `--ui-font-size-h4` with `.ui-large`.",
    kind: "input",
  },
  "--_length": {
    description:
      "Number of boxes. Follows `maxlength` from 4 to 8, and defaults to 6.",
    kind: "output",
  },
  "--_max-cell-size": {
    description:
      "Widest box: 1.2 times the control size or 1.6 times the font size, rounded to `--ui-space-2`.",
    kind: "input",
  },
  "--_slot-image": {
    description:
      "The ring mask on the next empty box while the field has focus.",
    kind: "input",
  },
} satisfies CustomProperties
