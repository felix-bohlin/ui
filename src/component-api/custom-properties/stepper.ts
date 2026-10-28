import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "Fill of a complete marker, border of the current one and color of the line after a complete step. Defaults to `--ui-selected-strong`.",
    kind: "input",
  },
  "--_check-image": {
    description:
      "The check cut out of a complete marker, as an image used as a mask.",
    kind: "input",
  },
  "--_connector-border-color": {
    description:
      "Color of the line to the next step. Defaults to `--ui-border-color`, and `--_accent` after a complete step.",
    kind: "output",
  },
  "--_connector-border-width": {
    description:
      "Width of the line to the next step. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_description-text-color": {
    description: "Color of the description. Defaults to `--ui-text-subtle`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the marker and line transitions, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the marker and line transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_error-image": {
    description:
      "The exclamation mark cut out of the marker of a step with an error, as an image used as a mask.",
    kind: "input",
  },
  "--_gap": {
    description: "Space between the steps and between a marker and its label.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "Size of the check, the exclamation mark and a `.ui-icon-checked`. 60% of `--_marker-size`.",
    kind: "input",
  },
  "--_label-text-color": {
    description:
      "Color of the label. `--ui-text-subtle` for a step to come, `--ui-text` for the current and complete steps, `--ui-invalid-text` for a step with an error.",
    kind: "output",
  },
  "--_marker-bg-color": {
    description:
      "Fill of the marker. Transparent, `--_accent` on a complete step and `--ui-invalid` on a step with an error.",
    kind: "output",
  },
  "--_marker-border-color": {
    description:
      "Border of the marker. `--ui-field-border-color`, `--_accent` on the current and complete steps and `--ui-invalid` on a step with an error.",
    kind: "output",
  },
  "--_marker-border-width": {
    description:
      "Width of the marker border. Defaults to `--ui-border-width-thick`.",
    kind: "input",
  },
  "--_marker-size": {
    description:
      "Size of the marker. Defaults to `--ui-space-6`, `--ui-space-5` with `.ui-small`.",
    kind: "input",
  },
  "--_marker-text-color": {
    description:
      "Color of the step number. `--ui-text-subtle`, `--ui-text` on the current step.",
    kind: "output",
  },
  "--_motion": {
    description: "Motion multiplier for the marker and line transitions.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Color of a `.ui-icon-checked` on the `--_accent` fill. Defaults to `--ui-on-selected-strong`.",
    kind: "input",
  },
  "--_orientation": {
    description:
      "`auto`, `horizontal` or `vertical`, set by `.ui-horizontal` and `.ui-vertical`. `auto` stacks the steps below `32rem`.",
    kind: "output",
  },
} satisfies CustomProperties
