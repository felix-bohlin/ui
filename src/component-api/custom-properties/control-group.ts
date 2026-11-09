import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border color of each button. `ButtonBorder` in forced colors, so the edges between buttons stay visible.",
    kind: "output",
  },
  "--_divider-border-color": {
    description:
      "Color of the line between two buttons without a border of their own, drawn as the later button's start border: from the button's `--_accent-tonal`, `currentColor` in `.ui-filled`, and `--_accent` in a `.ui-primary` or `.ui-critical` `.ui-filled` group. `--ui-control-border-color-filled` replaces it when a theme sets it. Outlined buttons share their own borders instead.",
    kind: "output",
  },
  "--_end-end-radius": {
    description:
      "Set to `0` on every control but the last, so the corner it shares with the next control is square.",
    kind: "output",
  },
  "--_end-start-radius": {
    description:
      "Set to `0` on every control but the first, or every control but the last in `.ui-vertical`, so the corner it shares is square.",
    kind: "output",
  },
  "--_overlap": {
    description:
      "How far each control overlaps the one before it, so their borders draw one line: the wider of `--ui-border-width` and `--ui-field-border-width`.",
    kind: "output",
  },
  "--_ring-reach": {
    description:
      "How far a focus ring reaches past a control, from `--ui-focus-ring-width` and `--ui-focus-ring-offset`. `.ui-overflow-scroll` pads the scrolling row by it, so the rings aren't clipped.",
    kind: "output",
  },
  "--_shadow": {
    description:
      "Set to `none` on every control, so the group has no shadows between its controls.",
    kind: "output",
  },
  "--_start-end-radius": {
    description:
      "Set to `0` on every control but the last, or every control but the first in `.ui-vertical`, so the corner it shares is square.",
    kind: "output",
  },
  "--_start-start-radius": {
    description:
      "Set to `0` on every control but the first, so the corner it shares with the control before it is square.",
    kind: "output",
  },
} satisfies CustomProperties
