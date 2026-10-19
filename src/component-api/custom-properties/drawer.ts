import type { CustomProperties } from "../types"

export default {
  "--_backdrop-bg-color": {
    description:
      "The backdrop color. Defaults to `--ui-backdrop-color`, `.ui-backdrop-transparent` clears it.",
    kind: "input",
  },
  "--_backdrop-blur": {
    description:
      "The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it.",
    kind: "input",
  },
  "--_bg-color": {
    description: "The background. Defaults to `--ui-surface-default`.",
    kind: "input",
  },
  "--_block-size": {
    description: "Height of `.ui-block-start` and `.ui-block-end` drawers.",
    kind: "input",
  },
  "--_border-color": {
    description:
      "Color of the inner edge border and the `.ui-header` and `.ui-footer` dividers.",
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
  "--_dir": {
    description: "Direction of the inline slide, `-1` in right-to-left.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the slide and backdrop fade. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_footer-gap": {
    description: "Gap between items in `.ui-footer`.",
    kind: "input",
  },
  "--_footer-padding": {
    description: "Padding of `.ui-footer`.",
    kind: "input",
  },
  "--_header-font-size": {
    description: "Font size of headings in `.ui-header`.",
    kind: "input",
  },
  "--_header-padding": {
    description: "Padding of `.ui-header`.",
    kind: "input",
  },
  "--_inline-size": {
    description: "Width of `.ui-inline-start` and `.ui-inline-end` drawers.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_scroll-shadow": {
    description:
      "Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--shadow-4`.",
    kind: "input",
  },
  "--_shadow": {
    description: "The shadow. Defaults to `--ui-shadow-overlay`.",
    kind: "input",
  },
  "--_text-color": {
    description: "The text color. Defaults to `--ui-text-primary`.",
    kind: "input",
  },
} satisfies CustomProperties
