import type { CustomProperties } from "../types"

export default {
  "--_min-inline-size": {
    description:
      "The least width of the input, which otherwise fits its value, unless `stretch` is set.",
    kind: "input",
  },
} satisfies CustomProperties
