import type { CustomProperties } from "../types"

export default {
  "--_border-style": {
    description:
      "Style of the line between term and description. `.ui-bordered.ui-dotted` makes it dotted.",
    kind: "input",
  },
  "--_border-width": {
    description:
      "Width of the line between term and description. `.ui-bordered.ui-dotted` sets it to `2px`.",
    kind: "input",
  },
} satisfies CustomProperties
