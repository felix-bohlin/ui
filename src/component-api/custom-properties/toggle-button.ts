import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current background. Set by the hover and selected states.",
    kind: "output",
  },
  "--_font-size": {
    description: "The font size. Set by the size classes.",
    kind: "input",
  },
  "--_size": {
    description: "Height and minimum width. Set by the size classes.",
    kind: "input",
  },
  "--_svg-size": {
    description: "Size of a child `svg`. Defaults to `--icon-size`.",
    kind: "input",
  },
} satisfies CustomProperties
