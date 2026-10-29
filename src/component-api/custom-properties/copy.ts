import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Accent of the label's border and text, like an outlined button: `--ui-button-accent`, `--ui-control-accent` or `--ui-palette-strong`.",
    kind: "output",
  },
  "--_bg-color": {
    description:
      "Background of the label. Defaults to `--ui-surface-elevated`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Border of the label. `--ui-control-border-color` when a theme sets it, otherwise `--_accent`.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the reveal and the fade, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the reveal and the fade. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "Font size of the label. `copy.js` sets the button's font size before it shows the label.",
    kind: "output",
  },
  "--_hidden": {
    description: "The `clip-path` the label reveals from, toward the button.",
    kind: "output",
  },
  "--_motion": {
    description:
      "Motion multiplier for the reveal and the fade. `0` turns them off.",
    kind: "input",
  },
  "--_offset": {
    description: "The gap between the label and the button.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the label. `copy.js` sets the button's radius before it shows the label.",
    kind: "output",
  },
  "--_text-color": {
    description: "Text color of the label, `--_accent` made readable.",
    kind: "output",
  },
} satisfies CustomProperties
