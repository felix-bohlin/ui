import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, else `--ui-control-accent`, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid`, capped the same way, when invalid.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_selected-bg-color` when checked.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "Border of `.ui-card`, read by `card.css`: `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid. On the checkbox and radio `input`, `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, and `CanvasText` in forced colors. A focused input draws `--ui-focus-border-color` instead when the theme sets it.",
    kind: "output",
  },
  "--_border-width": {
    description:
      "Border width of `.ui-card`, read by `card.css`: `--ui-border-width`. On the checkbox and radio `input`, `--_rest-border-width`, or `--ui-focus-border-width` while focused when the theme sets a wider one. The check, dash and dot are inset by the difference from `--_rest-border-width`, so they keep their size.",
    kind: "output",
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
  "--_mark-bg-color": {
    description:
      "Color of the check, the indeterminate dash and the radio dot when `--ui-choice-checked` is `mark`: `--_accent` in light mode, and in dark mode `--_accent` lifted to at least `--ui-text-min-lightness` with its chroma capped at `--ui-text-max-chroma`, so it reads on the surface. Set on `input`.",
    kind: "output",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, else `--ui-control-on-accent`, otherwise `--ui-on-primary`, or `--ui-on-fill` in dark mode. `--ui-on-fill` when invalid.",
    kind: "input",
  },
  "--_padding": {
    description:
      "Padding of `.ui-card`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset, and `--ui-space-2` in `.ui-small` and `.ui-x-small`.",
    kind: "input",
  },
  "--_rest-border-width": {
    description:
      "Border width of the unfocused checkbox and radio input: `--ui-choice-border-width`, or `--ui-field-border-width` when the theme leaves it unset. Set on `input`.",
    kind: "output",
  },
  "--_ripple-scale": {
    description:
      "Current scale of the ripple. Set by the hover and active states.",
    kind: "output",
  },
  "--_ripple-size": {
    description:
      "Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      "Background of a checked `.ui-card`: `--_accent` at `--ui-state-selected-alpha-accent`, so the fill, the border and the checked input share one color, red when invalid.",
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
} satisfies CustomProperties
