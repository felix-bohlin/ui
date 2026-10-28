import type { CustomProperties } from "../types"

export default {
  "--_c": {
    description:
      "Chroma of the color, which the lightness, hue and opacity tracks are painted with. The element sets it.",
    kind: "output",
  },
  "--_h": {
    description:
      "Hue of the color, which the lightness, chroma and opacity tracks are painted with. The element sets it.",
    kind: "output",
  },
  "--_indicator-bg-color": {
    description:
      "The swatch and thumb color. The element sets it to the field's color, and to `transparent` when the text isn't a color.",
    kind: "output",
  },
  "--_l": {
    description:
      "Lightness of the color, which the chroma, hue and opacity tracks are painted with. The element sets it.",
    kind: "output",
  },
  "--_picker-inline-size": {
    description: "Width of the picker popover.",
    kind: "input",
  },
  "--_preview-text-color": {
    description:
      "Text color on the picker's preview, black or white by the color's luminance.",
    kind: "output",
  },
  "--_size": {
    description:
      "Size of the picker button, set from `--_trigger-size` on the `.ui-button`.",
    kind: "output",
  },
  "--_text-color": {
    description:
      "Text color of the picker's buttons, the `Button` property set to `--_preview-text-color` so they stay readable on the color.",
    kind: "output",
  },
  "--_to": {
    description:
      "Direction of the track gradients, `to right`, or `to left` in right-to-left text.",
    kind: "output",
  },
  "--_track": {
    description:
      "The gradient of a slider's track, from its channel's lowest to its highest value at the current color.",
    kind: "output",
  },
  "--_track-block-size": {
    description: "Thickness of the slider tracks, thicker than a `Range`'s.",
    kind: "input",
  },
  "--_track-fill-bg-color": {
    description:
      "The `Range` track fill, `transparent` so the gradient shows end to end.",
    kind: "output",
  },
  "--_trigger-size": {
    description:
      "Size of the picker button: the field's `--_size` minus its border and a `--ui-space-1` inset on each side.",
    kind: "output",
  },
} satisfies CustomProperties
