import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked and indeterminate box. From `--primary`, with its lightness capped in dark mode.",
    kind: "input",
  },
  "--_accent-contrast": {
    description: "Color of the checkmark and dash on `--_accent`.",
    kind: "input",
  },
  "--_dir-rtl": {
    description:
      "Direction flag that centers the hover ripple. `-1`, or `1` in right-to-left.",
    kind: "output",
  },
  "--_input-size": {
    description:
      "Width and height of the box. Defaults to `--choice-size`, set by the size classes.",
    kind: "input",
  },
  "--_ripple-size": {
    description:
      "Size of the hover ripple, relative to the box. Set on `input`.",
    kind: "input",
  },
  "--_thumb-scale": {
    description:
      "Current scale of the ripple. Set by the hover and active states.",
    kind: "output",
  },
} satisfies CustomProperties
