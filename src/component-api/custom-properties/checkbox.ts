import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border of the checkbox input. `choice.css` sets the default, `--_accent` when checked or indeterminate and `--ui-invalid` when invalid. Set on `input`.",
    kind: "output",
  },
} satisfies CustomProperties
