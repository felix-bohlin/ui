import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_checked-bg-color` when checked.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "Border of `.ui-card`, read by `card.css`. `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid.",
    kind: "output",
  },
  "--_border-width": {
    description:
      "Border width of `.ui-card`, read by `card.css`. `--ui-border-width`.",
    kind: "output",
  },
  "--_card-padding": {
    description:
      "Padding of `.ui-card`. `--ui-space-3`, and `--ui-space-2` in `.ui-small` and `.ui-x-small`.",
    kind: "input",
  },
  "--_checked-bg-color": {
    description:
      "Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_hover-bg-color": {
    description:
      "Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid.",
    kind: "input",
  },
  "--_ripple-size": {
    description:
      "Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "Shadow of `.ui-card`, read by `card.css`. `--ui-shadow-surface` unless `.ui-tonal` or `.ui-elevated` set their own.",
    kind: "output",
  },
  "--_size": {
    description:
      "Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes. `switch.css` sets it to the track height.",
    kind: "input",
  },
  "--_thumb-scale": {
    description:
      "Current scale of the ripple. Set by the hover and active states.",
    kind: "output",
  },
} satisfies CustomProperties
