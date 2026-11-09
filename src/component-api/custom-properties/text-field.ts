import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Border color of `.ui-field` when its control has focus without `:focus-visible`, such as a clicked file or color input or a Select picked with the pointer. Text-entry fields show the focus ring on click too. Defaults to `--ui-primary`, `--ui-invalid` when invalid.",
    kind: "input",
  },
  "--_affix-button-size": {
    description:
      "Size of a `.ui-button` in `.ui-start` or `.ui-end`: the field's `--_size` minus its border and a `--ui-space-1` inset on each side.",
    kind: "output",
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
      "The current background of `.ui-field`. `--ui-field-bg-color`, or `--ui-surface` when a theme leaves it unset. Set by `.ui-filled` and its hover state.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color of `.ui-field` and the `.ui-top` and `.ui-bottom` dividers. Set by the invalid state.",
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
  "--_end-end-radius": {
    description:
      "The radius of the end-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the next control.",
    kind: "input",
  },
  "--_end-start-radius": {
    description:
      "The radius of the end-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.",
    kind: "input",
  },
  "--_field-padding-block": {
    description:
      "The preferred block padding of the control. Set by the size classes.",
    kind: "input",
  },
  "--_field-padding-block-fit": {
    description:
      "The block padding in use, `--_field-padding-block` capped to fit `--_size`.",
    kind: "output",
  },
  "--_field-padding-inline": {
    description:
      "The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`.",
    kind: "input",
  },
  "--_file-button-inset": {
    description:
      "Gap around the `::file-selector-button` of a file field: `--ui-space-2`, or `--ui-space-1` in `.ui-small` and `.ui-x-small`, shrunk so the button keeps one line of its text inside the field. Set on `input`.",
    kind: "output",
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
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius of `.ui-field` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The shadow of `.ui-field`. Defaults to `--ui-shadow-field`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.",
    kind: "input",
  },
  "--_size": {
    description:
      "The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.",
    kind: "input",
  },
  "--_start-end-radius": {
    description:
      "The radius of the start-end corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.",
    kind: "input",
  },
  "--_start-start-radius": {
    description:
      "The radius of the start-start corner of `.ui-field`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.",
    kind: "input",
  },
} satisfies CustomProperties
