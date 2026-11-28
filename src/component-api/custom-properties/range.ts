import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Color of the thumb, its ripple and the track fill. Defaults to `--ui-choice-accent`, else `--ui-control-accent`, else `--ui-primary`; `--ui-invalid` when invalid.",
    kind: "input",
  },
  "--_focus-ring-duration": {
    description:
      "Duration of the focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_forced-fill-bg-color": {
    description:
      "Thumb and fill color in forced colors mode: `SelectedItem`, `GrayText` when disabled.",
    kind: "output",
  },
  "--_forced-track-bg-color": {
    description:
      "Track color in forced colors mode: `CanvasText`, `GrayText` when disabled.",
    kind: "output",
  },
  "--_padding": {
    description:
      "Padding around the `input` that keeps the thumb and its ripple unclipped, from `--_thumb-size`.",
    kind: "output",
  },
  "--_thumb-bg-color": {
    description:
      "Thumb color: `--_accent`, `--ui-text-disabled` when disabled.",
    kind: "output",
  },
  "--_thumb-border-width": {
    description:
      "Width of the `--ui-surface` ring around the thumb. Set on the `<input>`.",
    kind: "input",
  },
  "--_thumb-duration": {
    description:
      "Duration of the thumb ripple transition, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_thumb-offset": {
    description: "Vertical offset that centers the thumb on the track.",
    kind: "output",
  },
  "--_thumb-ripple-bg-color": {
    description:
      "Color of the thumb ripple, from `--_accent` at `--ui-state-active-alpha-light`, or `--ui-state-active-alpha-dark` in dark mode.",
    kind: "output",
  },
  "--_thumb-ripple-size": {
    description:
      "Width of the thumb ripple. Set by the hover and active states.",
    kind: "output",
  },
  "--_thumb-size": {
    description:
      "Diameter of the thumb. Set by the size classes, `30px` on touch screens except in `.ui-large`.",
    kind: "input",
  },
  "--_track-base-bg-color": {
    description:
      "Color of the empty track at rest. Defaults to `--ui-track-bg-color`, else `--ui-field-border-color`; `--ui-surface` with more contrast, `--ui-surface-filled` in `.ui-filled`.",
    kind: "input",
  },
  "--_track-bg-color": {
    description: "Track color: `--_track-base-bg-color`, shaded while pressed.",
    kind: "output",
  },
  "--_track-block-size": {
    description: "Height of the track. Set by the size classes.",
    kind: "input",
  },
  "--_track-fill-bg-color": {
    description: "Color of the track fill: `--_accent`.",
    kind: "output",
  },
  "--_track-fill-fraction": {
    description: "Percentage of the track filled, from the thumb position.",
    kind: "output",
  },
  "--_track-radius": {
    description: "Corner radius of the track.",
    kind: "input",
  },
} satisfies CustomProperties
