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
    description: "Height of `.ui-block-start` and `.ui-block-end` drawers.",
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
  "--_content-padding": {
    description: "Padding of `.ui-content`.",
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
  "--_footer-gap": {
    description:
      "Gap between the items in `.ui-footer` and between the buttons in its `.ui-actions`.",
    kind: "input",
  },
  "--_footer-padding": {
    description: "Padding of `.ui-footer`.",
    kind: "input",
  },
  "--_header-padding": {
    description: "Padding of `.ui-header`.",
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
  "--_scroll-shadow": {
    description:
      "Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.",
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
  "--_title-font-size": {
    description:
      "Font size of the title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`.",
    kind: "input",
  },
} satisfies CustomProperties
