import type { CustomProperties } from "../types"

export default {
  "--_text-color": {
    description:
      "Text and underline color. `--ui-primary-text`, or `--ui-primary` with its lightness clamped to stay readable when the theme doesn't set it.",
    kind: "input",
  },
} satisfies CustomProperties
