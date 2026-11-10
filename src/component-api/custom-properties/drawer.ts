import type { CustomProperties } from "../types"

export default {
  "--_backdrop-bg-color": {
    description:
      "The backdrop color. Defaults to `--ui-backdrop-bg-color`, `.ui-backdrop-transparent` clears it.",
    kind: "input",
  },
  "--_backdrop-blur": {
    description:
      "The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it.",
    kind: "input",
  },
  "--_bg-color": {
    description: "The background. Defaults to `--ui-surface-elevated`.",
    kind: "input",
  },
  "--_block-size": {
    description:
      "Height of `.ui-block-start` and `.ui-block-end` drawers. Defaults to 80% of the viewport, at most `650px`.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the `.ui-header` and `.ui-footer` dividers, and of the inner edge unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-border-color-on-raised`.",
    kind: "input",
  },
  "--_border-width": {
    description:
      "Width of the inner edge border and the `.ui-header` and `.ui-footer` dividers.",
    kind: "input",
  },
  "--_closed-translate": {
    description:
      "Where the drawer slides from and back to: off the inline start by default, the inline end with `.ui-inline-end` (both mirrored by `--_direction`), and the top or bottom with `.ui-block-start` and `.ui-block-end`.",
    kind: "output",
  },
  "--_content-padding": {
    description:
      "Padding of `.ui-content`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.",
    kind: "input",
  },
  "--_direction": {
    description: "Direction of the inline slide, `-1` in right-to-left.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration-slow` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the slide and backdrop fade. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing.",
    kind: "output",
  },
  "--_edge-border-color": {
    description:
      "Color of the inner edge border. `--ui-border-color-raised` when a theme sets it, otherwise `--_border-color`.",
    kind: "input",
  },
  "--_footer-padding": {
    description:
      "Padding of `.ui-footer`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.",
    kind: "input",
  },
  "--_header-padding": {
    description:
      "Padding of `.ui-header`. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.",
    kind: "input",
  },
  "--_inline-size": {
    description: "Width of drawers that open from the inline start or end.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_shadow": {
    description: "The shadow. Defaults to `--ui-shadow-overlay`.",
    kind: "input",
  },
  "--_text-color": {
    description: "The text color. Defaults to `--ui-text-strong`.",
    kind: "input",
  },
} satisfies CustomProperties
