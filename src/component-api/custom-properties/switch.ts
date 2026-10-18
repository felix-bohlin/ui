import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked track. From `--primary`, with its lightness capped in dark mode.",
    kind: "input",
  },
  "--_accent-contrast": {
    description: "Color of the checked dot on `--_accent`.",
    kind: "input",
  },
  "--_dot-bg-color": {
    description:
      "Color of the unchecked dot and the track border. The checked dot uses `--_accent-contrast`.",
    kind: "input",
  },
  "--_dot-inset": {
    description:
      "Gap between the dot and the track edge, computed from `--_track-height` and `--_dot-size`.",
    kind: "output",
  },
  "--_dot-outline-size": {
    description:
      "Current outline width that grows the dot. Set by the checked and active states.",
    kind: "output",
  },
  "--_dot-size": {
    description:
      "Width and height of the dot. Defaults to `--switch-dot-size`, set by the size classes.",
    kind: "input",
  },
  "--_duration": {
    description: "Duration of the transitions, `--duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ease`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Size of the `.ui-icon-checked` and `.ui-icon-unchecked` icons, computed to fit beside the dot.",
    kind: "output",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_track-bg-color": {
    description: "Background of the unchecked track.",
    kind: "input",
  },
  "--_track-height": {
    description:
      "Height of the track. Defaults to `--switch-track-height`, set by the size classes.",
    kind: "input",
  },
  "--_track-width": {
    description:
      "Width of the track. Defaults to `--switch-track-width`, set by the size classes.",
    kind: "input",
  },
} satisfies CustomProperties
