import type { CustomProperties } from "../types"

export default {
  "--_gap": {
    description:
      "Space between the children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`. Defaults to `--ui-space-3`, set by the size classes.",
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
} satisfies CustomProperties
