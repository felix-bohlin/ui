import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description: "Color of the bar. Defaults to `--primary`.",
    kind: "input",
  },
  "--_bg-color": {
    description: "Color of the track. Set by `.ui-filled` and `.ui-tonal`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the value transition and the indeterminate animation.",
    kind: "input",
  },
} satisfies CustomProperties
