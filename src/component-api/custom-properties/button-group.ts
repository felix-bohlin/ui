import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description: "Border color of each button, `transparent` in a group.",
    kind: "output",
  },
  "--_border-radius": {
    description:
      "Corner radius of the group. Defaults to `--ui-button-radius`.",
    kind: "input",
  },
  "--_divider-color": {
    description:
      "Color of the lines between buttons, from the button's `--_accent-tonal`, `--_accent` in `.ui-outlined`, `currentColor` in `.ui-filled`, and `--_accent` in a `.ui-primary` or `.ui-critical` `.ui-filled` group. `--ui-control-border-color` replaces it in `.ui-outlined` and `--ui-control-border-color-filled` in `.ui-tonal` when a theme sets them; filled groups keep `currentColor` so the dividers stay visible on the fill.",
    kind: "output",
  },
  "--_edge-accent": {
    description:
      "Outline color of `.ui-outlined`. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.",
    kind: "input",
  },
  "--_edge-color": {
    description:
      "The current outline color around the group. `transparent`, or `--_edge-accent` in `.ui-outlined` (`--_edge-text` with more contrast). `--ui-control-border-color` replaces it in `.ui-outlined` and `--ui-control-border-color-filled` in `.ui-filled` and `.ui-tonal` when a theme sets them.",
    kind: "output",
  },
  "--_edge-text": {
    description:
      "Outline color of `.ui-outlined` with more contrast, a readable shade of `--_edge-accent`. `--ui-primary-text` in `.ui-primary`.",
    kind: "output",
  },
} satisfies CustomProperties
