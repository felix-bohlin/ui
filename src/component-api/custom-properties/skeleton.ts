import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "Color of the placeholder. Defaults to `--ui-surface-tonal`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Length of one shimmer, `1.6s` divided by `--_motion`, so a slower motion setting makes it calmer.",
    kind: "output",
  },
  "--_motion": {
    description:
      "Motion multiplier, `--ui-motion` by default. The shimmer only runs without reduced motion.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius. Defaults to `--ui-radius`; a line takes half of it, `.ui-circle` a circle and `.ui-squared` none.",
    kind: "input",
  },
  "--_shine-bg-color": {
    description:
      "Color of the band that sweeps across, a little lighter than `--_bg-color` in both color schemes.",
    kind: "input",
  },
} satisfies CustomProperties
