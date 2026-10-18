import type { CustomProperties } from "../types"

export default {
  "--_gap": {
    description:
      "Space between the children of `.ui-flow`, `.ui-cluster` and `.ui-grid`. Defaults to `--space-3`, set by the size classes.",
    kind: "input",
  },
  "--_justify-content": {
    description:
      "How `.ui-cluster` distributes its children along the row, such as `flex-end` or `space-between`.",
    kind: "input",
  },
  "--_max-inline-size": {
    description: "Maximum width of `.ui-container`.",
    kind: "input",
  },
  "--_min-inline-size": {
    description:
      "Narrowest column of `.ui-grid`. Columns are added while they fit at this width.",
    kind: "input",
  },
  "--_padding-inline": {
    description: "Inline padding of `.ui-container`. Defaults to `--space-4`.",
    kind: "input",
  },
} satisfies CustomProperties
