import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description: "Color of the bar. Defaults to `--ui-primary`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the value transition, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the value transition. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_loop-duration": {
    description:
      "Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the value transition and the indeterminate animation.",
    kind: "input",
  },
} satisfies CustomProperties
