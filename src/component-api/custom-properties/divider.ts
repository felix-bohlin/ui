import type { CustomProperties } from "../types"

export default {
  "--_divider-border-color": {
    description:
      "The line color. Defaults to `--ui-border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it.",
    kind: "input",
  },
} satisfies CustomProperties
