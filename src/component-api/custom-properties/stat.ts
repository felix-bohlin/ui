import type { CustomProperties } from "../types"

export default {
  "--_value-font-size": {
    description:
      "Font size of the value. Defaults to `--ui-font-size-h4`, set by the size classes.",
    kind: "input",
  },
} satisfies CustomProperties
