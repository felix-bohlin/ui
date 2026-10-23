import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.",
    kind: "input",
  },
  "--_accent-fill": {
    description:
      "Fill of filled buttons and of hovered outlined and tonal buttons, and the base of the filled hover and pressed shades. `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`.",
    kind: "input",
  },
  "--_accent-text": {
    description:
      "Text color of text and outlined buttons. `--_accent` in light mode. In dark mode its lightness is at least `--ui-text-min-lightness` and its chroma within `--ui-text-max-chroma`. `--ui-primary-text` in `.ui-primary` and `--ui-critical-text` in `.ui-critical`.",
    kind: "output",
  },
  "--_accent-tonal": {
    description:
      "Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.",
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
  "--_border-width": {
    description: "The border width.",
    kind: "input",
  },
  "--_default-active-bg-color": {
    description:
      "Pressed and current-page background of text buttons, from `--_accent`. As light as the hover background in dark mode with more contrast, so the text keeps 7:1.",
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
    description: "The font size. Set by `.ui-x-small` and `.ui-small`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "The size of a direct child `svg`. Icon-only buttons scale it with `--_min-block-size`.",
    kind: "input",
  },
  "--_min-block-size": {
    description: "The height. Set by the size classes.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-accent`.",
    kind: "input",
  },
  "--_on-accent-tonal": {
    description: "Text color of `.ui-tonal`.",
    kind: "input",
  },
  "--_outlined-active-bg-color": {
    description:
      "Pressed background of outlined and tonal buttons, from `--_accent`.",
    kind: "output",
  },
  "--_padding-inline": {
    description: "The inline padding. Set by the size classes.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, `--ui-button-hover-shadow` on hover when a theme sets it, none on text buttons.",
    kind: "output",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, hover, active and disabled states.",
    kind: "output",
  },
} satisfies CustomProperties
