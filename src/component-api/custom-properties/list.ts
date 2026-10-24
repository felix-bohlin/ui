import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.",
    kind: "input",
  },
  "--_description-text-color": {
    description:
      "Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.",
    kind: "input",
  },
  "--_divider-border-color": {
    description:
      "Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description: "Background of hovered items, from `--ui-primary`.",
    kind: "input",
  },
  "--_item-gap": {
    description: "Gap between the content of an item. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_item-padding-inline": {
    description:
      "Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      "Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.",
    kind: "input",
  },
  "--_selected-indicator-bg-color": {
    description:
      "Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.",
    kind: "input",
  },
  "--_selected-indicator-size": {
    description:
      "Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_selected-shadow": {
    description:
      "Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions.",
    kind: "output",
  },
  "--_separator-gap": {
    description:
      "Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_start-image-size": {
    description: "Width of a square image in `.ui-start`.",
    kind: "input",
  },
  "--_start-size": {
    description:
      "Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_start-video-size": {
    description: "Height of a video in `.ui-start`, which keeps a 16:9 ratio.",
    kind: "input",
  },
} satisfies CustomProperties
