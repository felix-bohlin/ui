import type { CustomProperties } from "../types"

export default {
  "--_shift-x": {
    description: "Horizontal shift of `.ui-floating`. Defaults to `0`.",
    kind: "input",
  },
  "--_shift-y": {
    description: "Vertical shift of `.ui-floating`. Defaults to `0`.",
    kind: "input",
  },
} satisfies CustomProperties
