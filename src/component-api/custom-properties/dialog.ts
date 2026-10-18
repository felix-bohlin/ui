import type { CustomProperties } from "../types"

export default {
  "--_backdrop-bg-color": {
    description: "The backdrop color. Defaults to `--backdrop-color`.",
    kind: "input",
  },
  "--_backdrop-blur": {
    description: "The backdrop filter. Defaults to a `--backdrop-blur` blur.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the open transition and scroll shadows, `--duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the open transition. Defaults to `--ease-enter`.",
    kind: "input",
  },
  "--_max-inline-size": {
    description: "Maximum width, capped to fit the viewport.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_scroll-shadow": {
    description:
      "Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--shadow-4`.",
    kind: "input",
  },
} satisfies CustomProperties
