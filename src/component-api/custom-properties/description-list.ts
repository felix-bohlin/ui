import type { CustomProperties } from "../types"

export default {
  "--_border-style": {
    description:
      "Style of the leader, the line between term and description. `.ui-leader-dotted` makes it dotted.",
    kind: "input",
  },
  "--_border-width": {
    description:
      "Width of the leader. Defaults to `--ui-border-width`, and `--ui-border-width-large` in `.ui-leader-dotted`.",
    kind: "input",
  },
} satisfies CustomProperties
