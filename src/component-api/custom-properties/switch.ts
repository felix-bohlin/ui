import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked track. In forced colors `SelectedItem`, `GrayText` when disabled.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Size of the `.ui-icon-checked` and `.ui-icon-unchecked` icons, computed to fit beside the thumb.",
    kind: "output",
  },
  "--_input-size": {
    description: "Height the label centers on, `--_track-height`.",
    kind: "output",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Color of the checked thumb on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
  "--_thumb-bg-color": {
    description:
      "Color of the unchecked thumb. Defaults to `--ui-switch-thumb-color`. The checked thumb uses `--_on-accent`.",
    kind: "input",
  },
  "--_thumb-inset": {
    description:
      "Gap between the thumb and the track edge, computed from `--_track-height` and `--_thumb-size`.",
    kind: "output",
  },
  "--_thumb-outline-size": {
    description:
      "Current outline width that grows the thumb. Set by the checked and active states.",
    kind: "output",
  },
  "--_thumb-size": {
    description:
      "Width and height of the thumb. Defaults to `--ui-switch-thumb-size`, set by the size classes.",
    kind: "input",
  },
  "--_track-bg-color": {
    description:
      "Background of the unchecked track. `--ui-track-color` when the theme sets it, otherwise `--ui-switch-track-color`.",
    kind: "input",
  },
  "--_track-border-color": {
    description:
      "Border of the unchecked track. Defaults to `--ui-field-border-color`, like the checkbox and radio borders. The checked track uses `--_accent`.",
    kind: "input",
  },
  "--_track-height": {
    description:
      "Height of the track. Defaults to `--ui-switch-track-height`, set by the size classes.",
    kind: "input",
  },
  "--_track-width": {
    description:
      "Width of the track. Defaults to `--ui-switch-track-width`, set by the size classes.",
    kind: "input",
  },
} satisfies CustomProperties
