import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "The background. Defaults to `--ui-surface-elevated`.",
    kind: "input",
  },
  "--_border-color": {
    description: "The border color. `--_divider-color` follows it.",
    kind: "input",
  },
  "--_border-radius": {
    description: "The corner radius. Defaults to `--ui-border-radius`.",
    kind: "input",
  },
  "--_border-width": {
    description: "The border width.",
    kind: "input",
  },
  "--_divider-color": {
    description: "Color of the item separators. Defaults to `--_border-color`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the open transition. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description:
      "Hover background of `.ui-critical` items, from `--ui-critical`.",
    kind: "output",
  },
  "--_margin-block": {
    description:
      "Block margin of a popover menu, `--_offset` or `0` depending on the placement.",
    kind: "output",
  },
  "--_margin-inline": {
    description:
      "Inline margin of a popover menu, `--_offset` for `.ui-inline-start` and `.ui-inline-end`.",
    kind: "output",
  },
  "--_max-block-size": {
    description: "Maximum height.",
    kind: "input",
  },
  "--_min-block-size": {
    description:
      "Height a popover menu keeps when space is tight, unless its content is shorter.",
    kind: "input",
  },
  "--_min-inline-size": {
    description:
      "Minimum width. A popover menu is also at least as wide as its invoker.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_offset": {
    description: "Gap between a popover menu and its invoker.",
    kind: "input",
  },
  "--_position-area": {
    description:
      "The `position-area` of a popover menu, from `--_side` and `--_span`. `--ui-anchor-position-area` overrides it.",
    kind: "output",
  },
  "--_shadow": {
    description: "The shadow. Defaults to `--ui-shadow-overlay`.",
    kind: "input",
  },
  "--_side": {
    description:
      "Side of the invoker the menu opens on. Set by `.ui-block-start`, `.ui-inline-start` and `.ui-inline-end`.",
    kind: "output",
  },
  "--_span": {
    description:
      "Direction the menu extends along the invoker. Set by the placement classes and `.ui-align-end`.",
    kind: "output",
  },
} satisfies CustomProperties
