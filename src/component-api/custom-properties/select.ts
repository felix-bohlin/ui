import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the `.ui-list` in the picker. Defaults to `--surface-filled`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the arrow and picker transitions. `0` turns them off.",
    kind: "input",
  },
} satisfies CustomProperties
