import type { CustomProperties } from "../types"

export default {
  "--_close-image": {
    description:
      "The icon of the close button, as an image used as a mask. Defaults to the Drawer's close icon.",
    kind: "input",
  },
  "--_critical-image": {
    description:
      "The icon of a critical toast, as an image used as a mask. Defaults to the `Callout` icon.",
    kind: "input",
  },
  "--_duration": {
    description: "Duration of a toast fading and sliding in.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of a toast fading and sliding in.",
    kind: "input",
  },
  "--_gap": {
    description: "Space between stacked toasts.",
    kind: "input",
  },
  "--_icon-image": {
    description:
      "The icon of one toast: `--_critical-image`, `--_info-image`, `--_success-image` or `--_warning-image` by its severity.",
    kind: "output",
  },
  "--_info-image": {
    description:
      "The icon of an info toast, as an image used as a mask. Defaults to the `Callout` icon.",
    kind: "input",
  },
  "--_inset": {
    description: "Distance of the stack from the edges of the viewport.",
    kind: "input",
  },
  "--_inset-block": {
    description:
      "Distance of the stack from the top or bottom edge, `--_inset` by default. Raise it to clear a bottom navigation bar.",
    kind: "input",
  },
  "--_inset-inline": {
    description:
      "Distance of the stack from the side edges, `--_inset` by default. The stack's width leaves it on both sides.",
    kind: "input",
  },
  "--_max-inline-size": {
    description: "Maximum width of a toast.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier, `0` with reduced motion.",
    kind: "input",
  },
  "--_shadow": {
    description: "Shadow of a toast, `--ui-shadow-overlay`.",
    kind: "output",
  },
  "--_success-image": {
    description:
      "The icon of a success toast, as an image used as a mask. Defaults to the `Callout` icon.",
    kind: "input",
  },
  "--_warning-image": {
    description:
      "The icon of a warning toast, as an image used as a mask. Defaults to the `Callout` icon.",
    kind: "input",
  },
} satisfies CustomProperties
