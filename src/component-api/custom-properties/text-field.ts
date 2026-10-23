import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid.",
    kind: "input",
  },
  "--_affix-text-color": {
    description:
      "The current color of `.ui-start`, `.ui-end`, `.ui-top` and `.ui-bottom`. Defaults to `--ui-text`, set by the invalid state.",
    kind: "output",
  },
  "--_arrow-inset": {
    description: "Distance of the select arrow from the inline end.",
    kind: "input",
  },
  "--_arrow-padding": {
    description:
      "Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.",
    kind: "output",
  },
  "--_bg-color": {
    description:
      "The current background of `.ui-field`. Set by `.ui-filled` and its hover state.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color of `.ui-field`, its header and footer. Set by the invalid state.",
    kind: "output",
  },
  "--_chevron-image": {
    description: "The select arrow, as an image used for a mask.",
    kind: "input",
  },
  "--_chevron-size": {
    description: "Width and height of the select arrow.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_field-padding-block": {
    description:
      "The preferred block padding of the control. Set by the size classes.",
    kind: "input",
  },
  "--_field-padding-block-fit": {
    description:
      "The block padding in use, `--_field-padding-block` capped to fit `--_min-block-size`.",
    kind: "output",
  },
  "--_field-padding-inline": {
    description:
      "The inline padding of the control and affixes. `.ui-large` sets it.",
    kind: "input",
  },
  "--_font-size": {
    description: "The font size of the control and affixes.",
    kind: "input",
  },
  "--_helper-text-color": {
    description:
      "The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-text-color`, set by the invalid state.",
    kind: "output",
  },
  "--_min-block-size": {
    description:
      "The minimum height of `.ui-field`. Defaults to `--ui-field-size`, set by the size classes.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
} satisfies CustomProperties
