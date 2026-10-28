import type { CustomProperties } from "../types"

export default {
  "--_duration": {
    description:
      "Duration of the hover and focus color transition, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the hover and focus color transition. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the hover and focus color transition. `0` turns it off.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "Text and underline color of `.ui-link` and of links without a `ui-` class in `.ui-rich-text`. Defaults to `--ui-primary-text`.",
    kind: "input",
  },
} satisfies CustomProperties
