import type { CustomProperties } from "../types"

export default {
  "--_picked-bg-color": {
    description:
      "The color, which the swatch, the preview and the plane's marker are painted with, `transparent` when the text isn't a color. The element sets it on each of them; it's registered and doesn't inherit.",
    kind: "output",
  },
  "--_picked-c": {
    description:
      "Chroma of the color, which the opacity track and the tint are painted with. The element sets it on the picker and the opacity slider; it's registered with `@property` and doesn't inherit, so a change restyles only those.",
    kind: "output",
  },
  "--_picked-h": {
    description:
      "Hue of the color, which the opacity track and the tint are painted with. The element sets it on the picker and the opacity slider; it's registered and doesn't inherit.",
    kind: "output",
  },
  "--_picked-l": {
    description:
      "Lightness of the color, which the opacity track is painted with. The element sets it on the opacity slider; it's registered and doesn't inherit.",
    kind: "output",
  },
  "--_picked-text-color": {
    description:
      "The color as the text of the contrast chips. The element sets it on each chip; it's registered and doesn't inherit.",
    kind: "output",
  },
  "--_picker-inline-size": {
    description: "Width of the picker popover.",
    kind: "input",
  },
  "--_plane-block-size": {
    description:
      "Height of the plane at the top of the picker, `9rem` by default.",
    kind: "input",
  },
  "--_plane-x": {
    description:
      "Where the color sits across the plane, its chroma as a fraction of `0.37`. The element sets it.",
    kind: "output",
  },
  "--_plane-y": {
    description:
      "Where the color sits up the plane, its OKLCH lightness. The element sets it.",
    kind: "output",
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
  "--_thumb-picked-bg-color": {
    description:
      "The color on a slider's thumb. The element sets it on each slider, where it inherits into the thumb inside the slider.",
    kind: "output",
  },
  "--_thumb-scale": {
    description:
      "Scale of a slider's thumb: `1`, `1.1` on hover and `1.2` while it's dragged.",
    kind: "output",
  },
  "--_thumb-size": {
    description:
      "Size of the slider thumbs and the height of the sliders, `1.25em`, or `1.75em` on a coarse pointer.",
    kind: "input",
  },
  "--_tint-alpha": {
    description:
      "Alpha of the picker's tint. The element sets it on the picker, `1` while the field holds a color and `0` when the text is empty or isn't a color, so the plain surface shows; it's registered and doesn't inherit.",
    kind: "output",
  },
  "--_tint-bg-color": {
    description:
      "The picker's tint: the surface's lightness with the color's hue, its chroma capped by `--_tint-chroma`. Registered so it doesn't inherit, so a new tint restyles only the picker, which the element updates at most every 100ms while the color changes.",
    kind: "output",
  },
  "--_tint-chroma": {
    description:
      "Highest chroma of the picker's tint, `0.03` by default. `0` turns the tint off.",
    kind: "input",
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
    description: "Thickness of the slider tracks, `0.75em`.",
    kind: "input",
  },
  "--_trigger-size": {
    description:
      "Size of the picker button: the field's `--_size` minus its border and a `--ui-space-1` inset on each side.",
    kind: "output",
  },
} satisfies CustomProperties
