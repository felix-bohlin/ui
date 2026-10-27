import type { CustomProperties } from "../types"

export default {
  "--_columns": {
    description:
      "The `grid-template-columns` of `.ui-layout-columns` from its breakpoint on, such as `3fr 2fr` or `15rem 1fr`. Defaults to `1fr 1fr`.",
    kind: "input",
  },
  "--_gap": {
    description:
      "Space between the children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid`, `.ui-layout-columns` and `.ui-layout-media`. Defaults to `--ui-space-3`, set by the size classes.",
    kind: "input",
  },
  "--_justify-content": {
    description:
      "How `.ui-layout-row` distributes its children along the row, such as `flex-end`. `.ui-spread` sets it to `space-between`.",
    kind: "input",
  },
  "--_max-inline-size": {
    description: "Maximum width of `.ui-layout-container`.",
    kind: "input",
  },
  "--_min-inline-size": {
    description:
      "Narrowest column of `.ui-layout-grid`. Columns are added while they fit at this width.",
    kind: "input",
  },
  "--_padding-inline": {
    description:
      "Inline padding of `.ui-layout-container`. Defaults to `--ui-space-4`.",
    kind: "input",
  },
  "--_sticky-inset": {
    description:
      "Distance from the top at which a `.ui-sticky` column of `.ui-layout-columns` sticks. Defaults to `--ui-space-4`.",
    kind: "input",
  },
} satisfies CustomProperties
