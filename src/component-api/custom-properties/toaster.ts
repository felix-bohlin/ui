import type { CustomProperties } from "../types"

export default {
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
} satisfies CustomProperties
