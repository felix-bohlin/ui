import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The background. Defaults to `--ui-surface-elevated`, like `Popover`, set again here over `list.css`.",
    kind: "input",
  },
  "--_divider-border-color": {
    description:
      "Color of the item separators. Defaults to `--ui-border-color-on-raised`.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description:
      "Hover background of `.ui-critical` items, from `--ui-palette-accent` of the critical palette.",
    kind: "output",
  },
  "--_min-inline-size": {
    description:
      "Minimum width. A popover menu is also at least as wide as its invoker.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius. Defaults to `--ui-menu-radius`, then `--ui-popover-radius`, or `--ui-radius` when the theme sets neither.",
    kind: "input",
  },
} satisfies CustomProperties
