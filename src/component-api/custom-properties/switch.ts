import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked track. In forced colors `SelectedItem`, `GrayText` when disabled.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Size of the `.ui-icon-checked` and `.ui-icon-unchecked` icons, computed to fit beside the thumb.",
    kind: "output",
  },
  "--_on-accent": {
    description:
      "Color of the checked thumb on `--_accent`. `SelectedItemText` in forced colors.",
    kind: "input",
  },
  "--_size": {
    description:
      "Height the label in `choice.css` centers on, `--_track-block-size`.",
    kind: "output",
  },
  "--_thumb-bg-color": {
    description:
      "Color of the unchecked thumb. Defaults to `--ui-switch-thumb-bg-color`. The checked thumb uses `--_on-accent`.",
    kind: "input",
  },
  "--_thumb-inset": {
    description:
      "Gap between the thumb and the track edge, computed from `--_track-block-size` and `--_thumb-size`.",
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
      "Background of the unchecked track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-switch-track-bg-color`.",
    kind: "input",
  },
  "--_track-block-size": {
    description:
      "Height of the track. Defaults to `--ui-switch-track-block-size`, set by the size classes.",
    kind: "input",
  },
  "--_track-border-color": {
    description:
      "Border of the unchecked track. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, like the checkbox and radio borders. The checked track uses `--_accent`.",
    kind: "input",
  },
  "--_track-inline-size": {
    description:
      "Width of the track. Defaults to `--ui-switch-track-inline-size`, set by the size classes.",
    kind: "input",
  },
} satisfies CustomProperties
