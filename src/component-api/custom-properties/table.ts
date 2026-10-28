import type { CustomProperties } from "../types"

export default {
  "--_duration": {
    description:
      "Duration of the header shadow transition in `.ui-sticky-header`, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the row and header shadow transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the row and header shadow transitions. `0` turns them off.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the table and its corner cells. Defaults to `--ui-radius`.",
    kind: "input",
  },
  "--_row-duration": {
    description:
      "Duration of the row hover transition, `--ui-duration-fast` times `--_motion`. A hovered row changes at once and fades back over this duration.",
    kind: "output",
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
