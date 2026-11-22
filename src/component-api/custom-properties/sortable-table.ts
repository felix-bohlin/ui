import type { CustomProperties } from "../types"

export default {
  "--_arrow-image": {
    description:
      "The sort arrow after a header's label, as an image used for a mask.",
    kind: "input",
  },
  "--_arrow-size": {
    description: "Width and height of the sort arrow.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the sort arrow's fade and turn, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the sort arrow's transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
} satisfies CustomProperties
