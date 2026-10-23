import type { CustomProperties } from "../types"

export default {
  "--_duration": {
    description:
      "Duration of the header shadow transition, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the header shadow transition. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the header shadow transition in `.ui-sticky-header`. `0` turns it off.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the table and its corner cells. Defaults to `--ui-radius`.",
    kind: "input",
  },
  "--_scroll-shadow": {
    description:
      "Shadow of the stuck header in `.ui-sticky-header`. Defaults to `--ui-shadow-scroll`.",
    kind: "input",
  },
  "--_sticky-offset": {
    description:
      "Distance from the top of the scroll container where the header of `.ui-sticky-header` sticks.",
    kind: "input",
  },
} satisfies CustomProperties
