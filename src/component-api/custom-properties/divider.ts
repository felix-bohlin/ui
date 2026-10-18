import type { CustomProperties } from "../types"

export default {
  "--_color": {
    description:
      "The line color. Defaults to `--border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it.",
    kind: "input",
  },
} satisfies CustomProperties
