import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description: "The current background. Set by the variants.",
    kind: "output",
  },
  "--_border-color": {
    description:
      "The current border color. Set by the variants and by hovering `.ui-card-link`.",
    kind: "output",
  },
  "--_border-width": {
    description: "The current border width. Set by the variants.",
    kind: "output",
  },
  "--_elevated-bg-color": {
    description:
      "Background of `.ui-elevated`. Defaults to `--surface-elevated`.",
    kind: "input",
  },
  "--_outlined-border-color": {
    description:
      "Border color of `.ui-outlined`. Defaults to `--border-color`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The current shadow. `.ui-elevated` sets `--_shadow-elevated`.",
    kind: "output",
  },
  "--_shadow-elevated": {
    description: "Shadow of `.ui-elevated`. Defaults to `--shadow-raised`.",
    kind: "input",
  },
  "--_surface-bg-color": {
    description:
      "Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated`. Defaults to `--surface-default`.",
    kind: "input",
  },
  "--_tonal-bg-color": {
    description: "Background of `.ui-tonal`. Defaults to `--surface-tonal`.",
    kind: "input",
  },
} satisfies CustomProperties
