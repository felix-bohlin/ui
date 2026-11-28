import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border of a reaction pill. The group's `--_border-color`, `--ui-text-subtle` on hover and `--ui-selected-strong` when checked. A focused pill draws `--ui-focus-border-color` instead when the theme sets it.",
    kind: "output",
  },
  "--_divider-gap": {
    description:
      "Set to `0px` on the `.ui-toggle-group`, so the group draws no lines between the pills, which keep their own gap.",
    kind: "output",
  },
  "--_font-size": {
    description: "Font size of the pills, set to `--ui-font-size-caption`.",
    kind: "output",
  },
  "--_selected-bg-color": {
    description:
      "Fill of a checked pill. `--ui-selected` when the theme sets it, otherwise `--ui-primary` mixed into `--ui-surface` at `--ui-state-selected-alpha-accent`. Its border is `--ui-selected-strong` and its text `--ui-on-selected`, or `--ui-text-strong`.",
    kind: "output",
  },
  "--_size": {
    description: "Size of the pills, set to `--ui-button-size-x-small`.",
    kind: "output",
  },
} satisfies CustomProperties
