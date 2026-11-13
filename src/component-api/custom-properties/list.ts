import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.",
    kind: "input",
  },
  "--_check-image": {
    description:
      'The check on the selected item of a `.ui-menu`, a `[role="listbox"]` list or a `Select` picker, as an image used as a mask in the text color. Defaults to `--ui-check-image`, then a built-in check.',
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
  "--_font-size": {
    description:
      "Font size of a `.ui-avatar` in `.ui-start` or `.ui-end` of a `.ui-dense` list: `--ui-font-size-caption`, like `.ui-x-small`. A size class on the avatar wins.",
    kind: "output",
  },
  "--_hover-bg-color": {
    description: "Background of hovered items, from `--ui-primary`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Icon size of a `.ui-avatar` in `.ui-start` or `.ui-end` of a `.ui-dense` list: `--ui-icon-size-small`, like `.ui-x-small`. A size class on the avatar wins.",
    kind: "output",
  },
  "--_item-duration": {
    description:
      "Duration of the row transitions, `--ui-duration-fast` times `--_motion`. A hovered row changes at once and fades back over this duration.",
    kind: "output",
  },
  "--_item-ease": {
    description: "Easing of the row transitions. Defaults to `--ui-ease`.",
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
  "--_motion": {
    description:
      "Motion multiplier for the row transitions of a `.ui-list`. `0` turns them off. A `Menu` and a `Select` read their own.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      "Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-selected-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.",
    kind: "input",
  },
  "--_selected-indicator-bg-color": {
    description:
      "Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.",
    kind: "input",
  },
  "--_selected-indicator-offset": {
    description:
      "Horizontal offset of `--_selected-shadow`: `--_selected-indicator-size`, negated in right-to-left text, so the bar stays on the start edge.",
    kind: "output",
  },
  "--_selected-indicator-size": {
    description:
      "Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_selected-shadow": {
    description:
      'Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-offset`, on the start edge in both writing directions. `none` in a `.ui-menu`, a `[role="listbox"]` list and a `Select` picker, which mark the selected item with a check.',
    kind: "output",
  },
  "--_separator-gap": {
    description:
      "Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.",
    kind: "input",
  },
  "--_size": {
    description:
      "Size of a `.ui-avatar` in `.ui-start` or `.ui-end` of a `.ui-dense` list: `--ui-control-size-x-small`, like `.ui-x-small`. A size class on the avatar wins.",
    kind: "output",
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
