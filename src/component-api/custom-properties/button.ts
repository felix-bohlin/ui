import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.",
    kind: "input",
  },
  "--_accent-contrast": {
    description:
      "Text color on a fill of `--_accent`. Defaults to `--ui-button-accent-contrast` when a theme sets it.",
    kind: "input",
  },
  "--_accent-text": {
    description:
      "Text color of text and outlined buttons. `--_accent`, lightened in dark mode to stay readable.",
    kind: "output",
  },
  "--_accent-tonal": {
    description: "Background of `.ui-tonal`.",
    kind: "input",
  },
  "--_accent-tonal-contrast": {
    description: "Text color of `.ui-tonal`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "The current background. Set by the variant, hover and active states.",
    kind: "output",
  },
  "--_border-color": {
    description: "The current border color. Set by the variant and states.",
    kind: "output",
  },
  "--_border-radius": {
    description:
      "The corner radius. Defaults to `--ui-button-border-radius`, `.ui-round` makes it round.",
    kind: "input",
  },
  "--_border-width": {
    description: "The border width.",
    kind: "input",
  },
  "--_default-active-bg-color": {
    description: "Pressed background of text buttons, from `--_accent`.",
    kind: "output",
  },
  "--_default-hover-bg-color": {
    description: "Hover background of text buttons, from `--_accent`.",
    kind: "output",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_filled-active-bg-color": {
    description: "Pressed background of filled buttons, from `--_accent`.",
    kind: "output",
  },
  "--_filled-hover-bg-color": {
    description: "Hover background of filled buttons, from `--_accent`.",
    kind: "output",
  },
  "--_font-size": {
    description: "The font size. Set by the size classes.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "The size of a direct child `svg`. Icon-only buttons scale it with `--_min-height`.",
    kind: "input",
  },
  "--_min-height": {
    description: "The height. Set by the size classes.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_outlined-active-bg-color": {
    description: "Pressed background of outlined buttons, from `--_accent`.",
    kind: "output",
  },
  "--_padding-inline": {
    description: "The inline padding. Set by the size classes.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, none on text buttons.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, hover, active and disabled states.",
    kind: "output",
  },
} satisfies CustomProperties
