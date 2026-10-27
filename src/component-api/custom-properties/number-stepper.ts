import type { CustomProperties } from "../types"

export default {
  "--_size": {
    description:
      "Size of the step buttons, set from `--_step-button-size` on each `.ui-button`.",
    kind: "output",
  },
  "--_step-button-size": {
    description:
      "Size of the step buttons: the field's `--_size` minus its border and a `--ui-space-1` inset on each side.",
    kind: "output",
  },
} satisfies CustomProperties
