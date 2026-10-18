import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked input. From `--primary`, with its lightness capped in dark mode, and from `--invalid-color` when invalid.",
    kind: "input",
  },
  "--_accent-contrast": {
    description: "Color of the checkmark, dash and dots on `--_accent`.",
    kind: "input",
  },
  "--_duration": {
    description: "Duration of the transitions, `--duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ease`.",
    kind: "input",
  },
  "--_input-size": {
    description:
      "Width and height of the checkbox and radio input, which the label centers on. Defaults to `--choice-size`, set by the size classes.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_ripple-size": {
    description:
      "Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.",
    kind: "input",
  },
  "--_thumb-scale": {
    description:
      "Current scale of the ripple. Set by the hover and active states.",
    kind: "output",
  },
} satisfies CustomProperties
