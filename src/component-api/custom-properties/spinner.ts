import type { CustomProperties } from "../types"

export default {
  "--_motion": {
    description:
      "Motion multiplier for the spin. `0` slows it down instead of stopping it.",
    kind: "input",
  },
} satisfies CustomProperties
