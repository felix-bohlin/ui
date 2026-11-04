import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description: "Color of the filled stars. Defaults to `--ui-warning`.",
    kind: "input",
  },
  "--_clear-bg-color": {
    description:
      "Color of the clear icon before the input stars. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
  "--_clear-hover-bg-color": {
    description: "Color of the hovered clear icon. Defaults to `--ui-text`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the fill transition on an input star, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the fill transition. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_empty-bg-color": {
    description:
      "Color of the empty stars. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-border-color`. An invalid input tints it with `--ui-invalid`.",
    kind: "input",
  },
  "--_fill-bg-color": {
    description:
      "Color of one input star: `--_empty-bg-color`, `--_accent` up to the checked or hovered star, and `--_clear-bg-color` on the clear icon.",
    kind: "output",
  },
  "--_max": {
    description:
      "Number of stars a meter is wide, for browsers without typed `attr()`. The components set it when `max` isn't `5`. Defaults to `5`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the fill transition.",
    kind: "input",
  },
  "--_size": {
    description:
      "Size of one star. Defaults to `--ui-icon-size` on a meter and `--ui-control-size-x-small` on an input, so every radio is a large enough target; `.ui-small` and `.ui-large` set the next size down and up.",
    kind: "input",
  },
  "--_star-image": {
    description: "The star mask every star is drawn with.",
    kind: "input",
  },
} satisfies CustomProperties
