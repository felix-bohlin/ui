import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the list and its items. Defaults to `--surface-filled`, `.ui-transparent` and `.ui-tonal` set it.",
    kind: "input",
  },
  "--_divider-color": {
    description:
      "Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. `currentColor` at 18%, `--border-color` with more contrast.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description:
      "Background of hovered, selected and current items, from `--primary`.",
    kind: "input",
  },
  "--_item-gap": {
    description: "Gap between the content of an item. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_separator-space": {
    description:
      "Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_start-size": {
    description:
      "Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.",
    kind: "input",
  },
} satisfies CustomProperties
