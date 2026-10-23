import type { CustomProperties } from "../types"

export default {
  "--_anchor-tx": {
    description: "Horizontal shift of `.ui-floating`. Defaults to `0`.",
    kind: "input",
  },
  "--_anchor-ty": {
    description: "Vertical shift of `.ui-floating`. Defaults to `0`.",
    kind: "input",
  },
} satisfies CustomProperties
