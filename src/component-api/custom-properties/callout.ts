import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current tint, drawn over `--_surface-bg-color`. Set by the severity classes and `.ui-outlined`.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color. `--ui-surface-border-color` when a theme sets it, otherwise `--ui-surface-tonal`. Set by the severity classes and `.ui-outlined`.",
    kind: "output",
  },
  "--_border-radius": {
    description: "The corner radius. Defaults to `--ui-radius`.",
    kind: "input",
  },
  "--_content-gap": {
    description: "Space between the children of `.ui-content`.",
    kind: "input",
  },
  "--_font-size": {
    description: "Font size of `.ui-content`.",
    kind: "input",
  },
  "--_gap": {
    description: "Gap between a direct child `svg` and `.ui-content`.",
    kind: "input",
  },
  "--_icon-color": {
    description:
      "The current color of a direct child `svg`. Set by the severity classes and `.ui-outlined`.",
    kind: "output",
  },
  "--_icon-size": {
    description: "Width of the icon column when there's a direct child `svg`.",
    kind: "input",
  },
  "--_link-hover-color": {
    description:
      "Link color on hover and focus. Defaults to `--ui-primary-text`, not used in `.ui-outlined`.",
    kind: "input",
  },
  "--_outlined-bg-color": {
    description:
      "Background of `.ui-outlined`. Defaults to `--ui-surface-default`.",
    kind: "input",
  },
  "--_outlined-border-color": {
    description:
      "Border color of `.ui-outlined`. Defaults to `--ui-border-color`, set by the severity classes.",
    kind: "input",
  },
  "--_outlined-icon-color": {
    description: "Icon color of `.ui-outlined`. Set by the severity classes.",
    kind: "input",
  },
  "--_outlined-text-color": {
    description: "Text color of `.ui-outlined`. Set by the severity classes.",
    kind: "input",
  },
  "--_padding": {
    description: "The padding.",
    kind: "input",
  },
  "--_shadow": {
    description: "The shadow. Defaults to `--ui-shadow-surface`.",
    kind: "input",
  },
  "--_surface-bg-color": {
    description:
      "The opaque background under the tint. Defaults to `--ui-surface-default`.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the severity classes and `.ui-outlined`.",
    kind: "output",
  },
  "--_title-font-size": {
    description: "Font size of headings in `.ui-content`.",
    kind: "input",
  },
} satisfies CustomProperties
