import type { CustomProperties } from "../types"

export default {
  "--_box-border-width": {
    description:
      "Line width of the boxes and of the ring on the next empty box: `--ui-field-border-width`, twice that while the field has focus.",
    kind: "input",
  },
  "--_box-end": {
    description:
      "Where each box ends in its cell: seven eighths of `--_cell-size`.",
    kind: "output",
  },
  "--_box-feather": {
    description:
      "Half the width over which the box edges and corners fade, so the arcs stay smooth. The side edges start twice this far inside the corners, and the radius stays this far under a quarter of the cell, so no corner reaches into the next. Defaults to `0.5px`.",
    kind: "input",
  },
  "--_box-radius": {
    description:
      "Corner radius of the boxes and of the ring: `--ui-field-radius`, else `--ui-radius`, capped `--_box-feather` under a quarter of `--_cell-size`.",
    kind: "input",
  },
  "--_box-start": {
    description:
      "Where each box starts in its cell: an eighth of `--_cell-size`.",
    kind: "output",
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
} satisfies CustomProperties
