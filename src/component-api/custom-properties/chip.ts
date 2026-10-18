import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The color the background, border, text and dot are derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "The current background. Set by the variant, color classes and hover states.",
    kind: "output",
  },
  "--_border-color": {
    description: "The current border color. Set by the color classes.",
    kind: "output",
  },
  "--_dot-color": {
    description:
      "The color of the `.ui-dot` marker. `currentColor`, or derived from `--_accent`.",
    kind: "output",
  },
  "--_font-size": {
    description: "The font size. `.ui-large` sets it.",
    kind: "input",
  },
  "--_icon-padding-inline": {
    description:
      "Inline padding on the side of a leading or trailing `svg`. `.ui-large` sets it.",
    kind: "input",
  },
  "--_icon-size": {
    description: "Width of an `svg`. `.ui-large` sets it.",
    kind: "input",
  },
  "--_padding-inline": {
    description: "The inline padding. `.ui-large` sets it.",
    kind: "input",
  },
  "--_size": {
    description:
      "The height. Defaults to `--chip-size`, set by the size classes.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, color classes and disabled states.",
    kind: "output",
  },
} satisfies CustomProperties
