import type { CustomProperties } from "../types"

export default {
  "--_indicator-bg-color": {
    description:
      "The swatch color. The element sets it to the field's color, and to `transparent` when the text isn't a color.",
    kind: "output",
  },
  "--_picker-inline-size": {
    description: "Width of the picker popover.",
    kind: "input",
  },
  "--_size": {
    description:
      "Size of the picker button, set from `--_trigger-size` on the `.ui-button`.",
    kind: "output",
  },
  "--_trigger-size": {
    description:
      "Size of the picker button: the field's `--_size` minus its border and a `--ui-space-1` inset on each side.",
    kind: "output",
  },
} satisfies CustomProperties
