import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "Background of the group. Defaults to `--ui-surface`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the outline around the group and the lines between buttons. Defaults to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.",
    kind: "input",
  },
  "--_divider-border-width": {
    description:
      "Width of the `CanvasText` borders that take the place of the shadow dividers in forced colors: `0px`, and `--ui-border-width` in browsers without gap decorations (`css/compat/toggle-group.css`), where the dividers are shadows, which forced colors drops.",
    kind: "output",
  },
  "--_divider-gap": {
    description:
      "The gap between toggle buttons and between rows, and the width of the column and row rules the browser draws in it, only between buttons: `--ui-border-width`. `0px` in browsers without gap decorations, where `--_divider-shadow` draws the lines.",
    kind: "output",
  },
  "--_divider-shadow": {
    description:
      "Shadow each toggle button draws on its start and top edges as the line between it and the buttons before and above it, which the group clips at its outer edge: `none`, and in browsers without gap decorations (`css/compat/toggle-group.css`) one line of `--ui-border-width` in `--_border-color` on each edge, on the right in right-to-left.",
    kind: "output",
  },
  "--_radius": {
    description:
      "Corner radius of the group. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it, capped at half of `--_size` so a round radius doesn't clip the end items.",
    kind: "input",
  },
  "--_size": {
    description:
      "Height of a button in the group, which caps `--_radius`. Defaults to `--ui-button-size`, set by the size classes.",
    kind: "input",
  },
} satisfies CustomProperties
