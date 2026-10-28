import type { CustomProperties } from "../types"

export default {
  "--_dot-size": {
    description:
      "Size of the plain marker dot. Defaults to `--ui-space-3`, `--ui-space-2` with `.ui-small`.",
    kind: "input",
  },
  "--_gap": {
    description:
      "Space on each side of the marker column. Defaults to `--ui-space-3`, `--ui-space-2` with `.ui-small`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Size of a `.ui-marker` with an icon. Defaults to `--ui-space-5`, `--ui-space-4` with `.ui-small`.",
    kind: "input",
  },
  "--_item-gap": {
    description:
      "Space below each item. Defaults to `--ui-space-5`, `--ui-space-3` with `.ui-small`.",
    kind: "input",
  },
  "--_line-border-color": {
    description:
      "Color of the line between the markers. Defaults to `--ui-border-color`, and `.ui-tracked` sets `--ui-primary` before the current item.",
    kind: "input",
  },
  "--_line-border-width": {
    description:
      "Width of the line and the marker border. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_marker-accent": {
    description:
      "The marker's border, or its fill for a colored or current item. Set per item from the color and current state.",
    kind: "output",
  },
  "--_marker-size": {
    description:
      "Size of the item's marker: `--_dot-size`, or `--_icon-size` with a `.ui-marker`.",
    kind: "output",
  },
  "--_next-marker-size": {
    description:
      "Size of the next item's marker, which ends the line between them.",
    kind: "output",
  },
} satisfies CustomProperties
