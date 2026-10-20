import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of the picker's `.ui-list`. Set it on the `.ui-list`; on the root it is the field background. Defaults to `--ui-surface-filled`.",
    kind: "input",
  },
} satisfies CustomProperties
