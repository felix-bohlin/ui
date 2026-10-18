import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current background. Set by the variant, tone and hover states.",
    kind: "output",
  },
  "--_border-color": {
    description: "The current border color. Set by the tone classes.",
    kind: "output",
  },
  "--_dot-color": {
    description:
      "The color of the `.ui-dot` marker. `currentColor`, or derived from `--_tone`.",
    kind: "output",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, tone and disabled states.",
    kind: "output",
  },
  "--_tone": {
    description:
      "The tone color the background, border, text and dot are derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`.",
    kind: "input",
  },
} satisfies CustomProperties
