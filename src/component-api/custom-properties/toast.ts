import type { CustomProperties } from "../types"

export default {
  "--_dir": {
    description: "Direction of the enter slide, `-1` in right-to-left.",
    kind: "output",
  },
  "--_enter-duration": {
    description:
      "Duration of the enter animation, `--ui-duration-slow` times `--_motion`.",
    kind: "output",
  },
  "--_exit-duration": {
    description:
      "Duration of the exit animation, `--ui-duration-slow` times `--_motion`.",
    kind: "output",
  },
  "--_hold": {
    description:
      "How long the toast stays before it exits. `data-duration` in browsers with typed `attr()`, otherwise `--_hold-duration`.",
    kind: "output",
  },
  "--_hold-duration": {
    description:
      "How long the toast stays before it exits when it has no `data-duration`. Defaults to `5s`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the animations and transitions. `0` turns them off.",
    kind: "input",
  },
} satisfies CustomProperties
