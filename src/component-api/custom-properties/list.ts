import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the list and its items. Defaults to `--surface-filled`, `.ui-transparent` and `.ui-tonal` set it.",
    kind: "input",
  },
  "--_dot-size": {
    description: "Dot size of a `.ui-switch` item, the small switch size.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description:
      "Background of hovered, selected and current items, from `--primary`.",
    kind: "input",
  },
  "--_input-size": {
    description: "Size of `.ui-checkbox` and `.ui-radio` in `.ui-dense`.",
    kind: "input",
  },
  "--_item-gap": {
    description: "Gap between the content of an item. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_separator-color": {
    description:
      "Color of the lines between items in `.ui-bordered` and on `.ui-border-top`.",
    kind: "input",
  },
  "--_start-size": {
    description:
      "Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_track-height": {
    description: "Track height of a `.ui-switch` item, the small switch size.",
    kind: "input",
  },
  "--_track-width": {
    description: "Track width of a `.ui-switch` item, the small switch size.",
    kind: "input",
  },
} satisfies CustomProperties
