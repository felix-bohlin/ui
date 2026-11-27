import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Border color of `.ui-field-container` on focus without `:focus-visible`: a clicked select, file or color input, not a text field. Defaults to `--ui-primary`, `--ui-invalid` when invalid.",
    kind: "input",
  },
  "--_affix-block-size": {
    description:
      "Height `.ui-start` and `.ui-end` center their content in: `--_size` inside the border. In a textarea field or with `.ui-top` or `.ui-bottom`, the control's first line and its block padding, set on the parts.",
    kind: "output",
  },
  "--_affix-button-size": {
    description:
      "Size of a `.ui-button` in `.ui-start` or `.ui-end`, which set it: `--_affix-block-size` less `--_affix-padding-block` on each side, at least `--ui-target-min-size`.",
    kind: "output",
  },
  "--_affix-padding-block": {
    description:
      "Space above and below a `.ui-button` in `.ui-start` or `.ui-end`, which set it: `--ui-space-1`, less to fit a `--ui-target-min-size` button. Also pads those parts in a textarea field, unless they hold only text.",
    kind: "output",
  },
  "--_affix-text-color": {
    description:
      "Text color of `.ui-start`, `.ui-end`, `.ui-top` and `.ui-bottom`. `--ui-text`, `--ui-invalid-text` when invalid.",
    kind: "output",
  },
  "--_arrow-inset": {
    description:
      "Distance of the select and `datalist` arrow from the inline end.",
    kind: "input",
  },
  "--_arrow-padding": {
    description:
      "Inline-end padding that clears the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.",
    kind: "output",
  },
  "--_bg-color": {
    description:
      "Background of `.ui-field-container`. `--ui-field-bg-color`, else `--ui-surface`; set by `.ui-filled` and its hover.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "Border color of `.ui-field-container` and the `.ui-top` and `.ui-bottom` dividers. `--ui-invalid` when invalid.",
    kind: "output",
  },
  "--_chevron-image": {
    description:
      "Mask image of the select and `datalist` arrow. Defaults to `--ui-icon-expand`.",
    kind: "input",
  },
  "--_chevron-size": {
    description: "Size of the select and `datalist` arrow.",
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
      "End-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the next control in a `ControlGroup`.",
    kind: "input",
  },
  "--_end-start-radius": {
    description:
      "End-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.",
    kind: "input",
  },
  "--_field-padding-block": {
    description:
      "Preferred block padding of the control. Set by the size classes.",
    kind: "input",
  },
  "--_field-padding-block-fit": {
    description:
      "Block padding in use: `--_field-padding-block`, capped to fit `--_size`.",
    kind: "output",
  },
  "--_field-padding-inline": {
    description:
      "Inline padding of the control and affixes. Defaults to `--ui-field-padding-inline` (else `--ui-space-2`), or `--ui-field-padding-inline-large` (else `--ui-space-4`) in `.ui-large`. An affix with a `.ui-button` uses `--ui-space-1`.",
    kind: "input",
  },
  "--_file-button-inset": {
    description:
      "Space above and below the `::file-selector-button`: `--_file-button-padding`, less so one line of text fits. Set on the `input`.",
    kind: "output",
  },
  "--_file-button-padding": {
    description:
      "Preferred space above and below the `::file-selector-button`, outside `.ui-drop-zone`. `--ui-space-2`, `--ui-space-1` in `.ui-small` and `.ui-x-small`.",
    kind: "input",
  },
  "--_font-size": {
    description:
      "Font size of the control, `.ui-start` and `.ui-end`. Set by `.ui-x-small` and `.ui-small`, at least 16px on iPhone and iPad.",
    kind: "input",
  },
  "--_helper-text-color": {
    description:
      "Text color of `.ui-start-text` and `.ui-end-text`. `--ui-field-helper-text-color`, `--ui-invalid-text` when invalid.",
    kind: "output",
  },
  "--_min-inline-size": {
    description:
      "Minimum width of the control beside `.ui-start` and `.ui-end`, which shrink to keep it, capped at the field's width. Defaults to `8ch`, `4ch` with a `StepButton`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of `.ui-field-container` and the file button. Defaults to `--ui-field-radius`, else `--ui-radius`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "Shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, else `--ui-shadow-control`; `none` in a `ControlGroup`.",
    kind: "input",
  },
  "--_size": {
    description:
      "Minimum height of `.ui-field-container`, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.",
    kind: "input",
  },
  "--_start-end-radius": {
    description:
      "Start-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.",
    kind: "input",
  },
  "--_start-start-radius": {
    description:
      "Start-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the previous control in a `ControlGroup`.",
    kind: "input",
  },
} satisfies CustomProperties
