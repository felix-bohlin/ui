import type { CustomProperties } from "../types"

export default {
  "--_text-color": {
    description:
      "Text and underline color of `.ui-link` and of links without a `ui-` class in `.ui-rich-text`. Defaults to `--ui-primary-text`.",
    kind: "input",
  },
} satisfies CustomProperties
