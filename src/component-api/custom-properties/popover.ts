import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The background. Defaults to `--ui-surface-elevated`, which `Menu` sets again over `list.css`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "The edge color. `--ui-border-color-raised` when a theme sets it, otherwise `--ui-border-color-on-raised`.",
    kind: "input",
  },
  "--_border-width": {
    description: "The border width. Defaults to `--ui-border-width`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration-slow` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the open and close transitions. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing.",
    kind: "output",
  },
  "--_ease-move": {
    description:
      "Easing of the scale. `--ui-ease-move` while opening when a theme sets it, otherwise `--_ease`.",
    kind: "output",
  },
  "--_fit-max-block-size": {
    description:
      "Maximum height of the popover in the space on its side: `--_max-block-size`, capped to that space minus `--_offset` at both ends. Needs `calc-size()`, and the `--ui-popover-block-end` and `--ui-popover-block-start` fallbacks read it too.",
    kind: "output",
  },
  "--_margin-block": {
    description:
      "Block margin of the popover, `--_offset` or `0` depending on the side.",
    kind: "output",
  },
  "--_margin-inline": {
    description:
      "Inline margin of the popover, `--_offset` for `.ui-inline-start` and `.ui-inline-end`.",
    kind: "output",
  },
  "--_max-block-size": {
    description: "Maximum height.",
    kind: "input",
  },
  "--_max-inline-size": {
    description:
      "Maximum width of a `.ui-popover`, capped to fit the viewport. Defaults to `24rem`.",
    kind: "input",
  },
  "--_min-block-size": {
    description:
      "Height the popover keeps when space is tight, unless its content is shorter. Needs `calc-size()`.",
    kind: "input",
  },
  "--_min-inline-size": {
    description:
      "Minimum width of a `.ui-popover`, capped to fit the viewport. Defaults to `16rem`, so a popover too wide for the space on its side moves below or above its trigger instead of shrinking.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_offset": {
    description: "Gap between the popover and its invoker.",
    kind: "input",
  },
  "--_padding": {
    description:
      "Padding of the header, content and footer of a `.ui-popover`. Defaults to `--ui-space-3`.",
    kind: "input",
  },
  "--_position-area": {
    description:
      "The `position-area` of the popover, from `--_side` and `--_span`. `--ui-anchor-position-area` overrides it.",
    kind: "output",
  },
  "--_radius": {
    description:
      "The corner radius. Defaults to `--ui-popover-radius`, or `--ui-radius` when the theme doesn't set it. `Menu` reads `--ui-menu-radius` first.",
    kind: "input",
  },
  "--_shadow": {
    description: "The shadow. Defaults to `--ui-shadow-overlay`.",
    kind: "input",
  },
  "--_side": {
    description:
      "Side of the invoker the popover opens on, a `self-` keyword so it follows the popover's own direction. Set by `.ui-block-start`, `.ui-inline-start` and `.ui-inline-end`.",
    kind: "output",
  },
  "--_span": {
    description:
      "Direction the popover extends along the invoker. Set by the side classes and `.ui-align-end`.",
    kind: "output",
  },
} satisfies CustomProperties
