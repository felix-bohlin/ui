import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "Background of a remove button in the compact row, which lies over the preview: the `Button` property, set to `--ui-surface`.",
    kind: "output",
  },
  "--_description-max-inline-size": {
    description:
      "The widest a failed file's message gets when the compact row opens it as a popover. `16rem` by default.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the drop zone's highlight, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description:
      "Easing of the drop zone's highlight. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_field-bg-color": {
    description:
      "Background of the drop zone. Transparent, and `--ui-selected` or a tint of `--ui-primary` while files are dragged over it.",
    kind: "output",
  },
  "--_field-border-color": {
    description:
      "Border color of the drop zone. `--ui-field-border-color`, and `--ui-focus-ring-color` while files are dragged over it.",
    kind: "output",
  },
  "--_item-size": {
    description:
      "Width and height of the add tile and of each preview in the compact row. `4.75rem` by default.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the drop zone's highlight.",
    kind: "input",
  },
  "--_preview-bg-color": {
    description:
      "Color of the placeholder a file shows until it has a preview. Defaults to `--ui-surface-tonal`.",
    kind: "input",
  },
  "--_preview-size": {
    description:
      "Width and height of a file's preview in a List row. Defaults to `--ui-control-size`.",
    kind: "input",
  },
  "--_size": {
    description:
      "Size of a remove button in the compact row: the `Button` property, set to `--ui-button-size-x-small`.",
    kind: "output",
  },
} satisfies CustomProperties
