import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The color the hover background of a colored button or link chip is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`.",
    kind: "output",
  },
  "--_bg-color": {
    description:
      "The current background. Set by the variant, color classes and hover states.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color. Defaults to `--ui-control-border-color-filled`, and `.ui-outlined` to `--ui-control-border-color`, both falling back to `--ui-border-color`. The severity classes set it.",
    kind: "output",
  },
  "--_dot-bg-color": {
    description:
      "The color of the `.ui-dot` marker. `currentColor`, or `--ui-palette-accent` with a severity class.",
    kind: "output",
  },
  "--_font-size": {
    description: "The font size. `.ui-large` sets it.",
    kind: "input",
  },
  "--_icon-padding-inline": {
    description:
      "Inline padding on the side of a leading or trailing `svg`. `.ui-large` sets it.",
    kind: "input",
  },
  "--_icon-size": {
    description: "Width of an `svg`. `.ui-large` sets it.",
    kind: "input",
  },
  "--_padding-inline": {
    description: "The inline padding. `.ui-large` sets it.",
    kind: "input",
  },
  "--_pressed-bg-color": {
    description:
      'Background of a button chip with `aria-pressed="true"`. `--ui-selected` when the theme sets it, otherwise `--ui-primary`.',
    kind: "input",
  },
  "--_size": {
    description:
      "The height. Defaults to `--ui-chip-size`, set by the size classes.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, color classes and disabled states.",
    kind: "output",
  },
} satisfies CustomProperties
