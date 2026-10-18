import type { CustomProperties } from "../types"

export default {
  "--_forced-fill-color": {
    description:
      "Thumb and fill color in forced colors mode. `GrayText` when disabled.",
    kind: "output",
  },
  "--_forced-track-color": {
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
      "The current thumb color. From `--primary`, set by the invalid and disabled states.",
    kind: "output",
  },
  "--_thumb-highlight-color": {
    description:
      "Color of the ring around the thumb. From `--primary`, set by the invalid state.",
    kind: "output",
  },
  "--_thumb-highlight-size": {
    description:
      "Current width of the ring around the thumb. Set by the hover and active states.",
    kind: "output",
  },
  "--_thumb-offset": {
    description: "Vertical offset that centers the thumb on the track.",
    kind: "input",
  },
  "--_thumb-size": {
    description: "Width and height of the thumb. Larger on touch screens.",
    kind: "input",
  },
  "--_track-color": {
    description:
      "The current track color. Set by `.ui-filled`, `.ui-tonal` and the active and disabled states.",
    kind: "output",
  },
  "--_track-fill": {
    description:
      "How much of the track is filled, animated from the thumb position.",
    kind: "output",
  },
  "--_track-fill-color": {
    description:
      "Color of the filled part of the track. From `--primary`, set by the invalid state.",
    kind: "output",
  },
  "--_track-height": {
    description: "Height of the track.",
    kind: "input",
  },
  "--_track-radius": {
    description: "Corner radius of the track.",
    kind: "input",
  },
} satisfies CustomProperties
