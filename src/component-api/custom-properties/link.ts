import type { CustomProperties } from "../types"

export default {
  "--_text-color": {
    description:
      "Text and underline color. `--primary`, darkened in light mode and lightened in dark mode to stay readable.",
    kind: "input",
  },
} satisfies CustomProperties
