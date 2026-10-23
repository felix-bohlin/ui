import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Color of the thumb, its ring and the track fill. Defaults to `--ui-choice-accent`, or `--ui-primary` when the theme doesn't set it, and is set by the invalid state.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the thumb ring transition, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the thumb ring transition and focus ring. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_focus-ring-duration": {
    description:
      "Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions.",
    kind: "output",
  },
  "--_forced-fill-bg-color": {
    description:
      "Thumb and fill color in forced colors mode. `GrayText` when disabled.",
    kind: "output",
  },
  "--_forced-track-bg-color": {
    description: "Track color in forced colors mode. `GrayText` when disabled.",
    kind: "output",
  },
  "--_inset": {
    description:
      "Padding around the `input` that keeps the thumb and its highlight from clipping, computed from `--_thumb-size`.",
    kind: "output",
  },
  "--_motion": {
    description:
      "Motion multiplier for the thumb highlight and focus ring. `0` turns them off.",
    kind: "input",
  },
  "--_thumb-bg-color": {
    description:
      "The current thumb color. From `--_accent`, set by the disabled state.",
    kind: "output",
  },
  "--_thumb-border-width": {
    description:
      "Width of the page-colored ring between the thumb and the track. Set on the `<input>`.",
    kind: "input",
  },
  "--_thumb-highlight-bg-color": {
    description:
      "Color of the ring around the thumb, from `--_accent` and `--ui-state-active-alpha-light`.",
    kind: "output",
  },
  "--_thumb-highlight-size": {
    description:
      "Current width of the ring around the thumb. Set by the hover and active states.",
    kind: "output",
  },
  "--_thumb-offset": {
    description: "Vertical offset that centers the thumb on the track.",
    kind: "output",
  },
  "--_thumb-size": {
    description: "Width and height of the thumb. Larger on touch screens.",
    kind: "input",
  },
  "--_track-base-bg-color": {
    description:
      "Color of the empty track at rest. `--ui-track-bg-color` when the theme sets it, otherwise the field border, and `--ui-surface` under more contrast; set by `.ui-filled` and `.ui-tonal`.",
    kind: "input",
  },
  "--_track-bg-color": {
    description:
      "The current track color, from `--_track-base-bg-color`; set by the active and disabled states.",
    kind: "output",
  },
  "--_track-block-size": {
    description: "Height of the track.",
    kind: "input",
  },
  "--_track-fill-bg-color": {
    description: "Color of the filled part of the track, from `--_accent`.",
    kind: "output",
  },
  "--_track-fill-fraction": {
    description:
      "How much of the track is filled, animated from the thumb position.",
    kind: "output",
  },
  "--_track-radius": {
    description: "Corner radius of the track.",
    kind: "input",
  },
} satisfies CustomProperties
