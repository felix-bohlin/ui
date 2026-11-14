import type { CustomProperties } from "../types"

export default {
  "--_border-style": {
    description:
      "Style of the line between term and description. `.ui-border-dotted` makes it dotted.",
    kind: "input",
  },
  "--_border-width": {
    description:
      "Width of the line between term and description. Defaults to `--ui-border-width`, and `--ui-border-width-thick` in `.ui-border-dotted`.",
    kind: "input",
  },
} satisfies CustomProperties
