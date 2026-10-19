import type { CustomProperties } from "../types"

export default {
  "--_arrow-size": {
    description: "Size of the arrow in `.ui-with-arrow`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Background of the tooltip and its arrow. Defaults to `--ui-surface-inverse`.",
    kind: "input",
  },
  "--_duration": {
    description: "Duration of the fade, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the fade. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_min-inline-size": {
    description: "The minimum width, unless the content is narrower.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the fade. `0` turns it off.",
    kind: "input",
  },
  "--_offset": {
    description:
      "Distance from the trigger. `.ui-with-arrow` computes it from `--_arrow-size`.",
    kind: "input",
  },
  "--_shift": {
    description:
      "How far a shifted tooltip reaches past the center of the trigger.",
    kind: "input",
  },
  "--_text-color": {
    description: "The text color. Defaults to `--ui-text-inverse`.",
    kind: "input",
  },
} satisfies CustomProperties
