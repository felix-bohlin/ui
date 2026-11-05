import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "The current background. Set by the variants.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`.",
    kind: "output",
  },
  "--_border-width": {
    description: "The current border width. Set by the variants.",
    kind: "output",
  },
  "--_content-anchor": {
    description:
      "Anchor name of a dialog's or drawer's `.ui-content`, which places its scroll shadows. `--ui-dialog-content` or `--ui-drawer-content`.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the card link border transition and the focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the card link border transition and the focus ring animation. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_elevated-bg-color": {
    description:
      "Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.",
    kind: "input",
  },
  "--_elevated-shadow": {
    description:
      "Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.",
    kind: "input",
  },
  "--_footer-gap": {
    description:
      "Gap between the items in a dialog's or drawer's `.ui-footer` and between the buttons in its `.ui-actions`. Defaults to `--ui-space-2`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the card link border transition and the focus ring animation. `0` turns them off.",
    kind: "input",
  },
  "--_outlined-border-color": {
    description:
      "Border color of `.ui-outlined`. Defaults to `--ui-border-color`.",
    kind: "input",
  },
  "--_padding": {
    description:
      "Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.",
    kind: "input",
  },
  "--_scroll-shadow": {
    description:
      "Shadow at the edges of a dialog's or drawer's `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`.",
    kind: "output",
  },
  "--_surface-bg-color": {
    description:
      "Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.",
    kind: "input",
  },
  "--_title-font-size": {
    description:
      "Font size of a dialog's or drawer's title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.",
    kind: "input",
  },
  "--_tonal-bg-color": {
    description: "Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.",
    kind: "input",
  },
} satisfies CustomProperties
