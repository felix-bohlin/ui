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
  "--_duration": {
    description:
      "Duration of the focus ring animation, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the focus ring animation. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_elevated-bg-color": {
    description:
      "Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.",
    kind: "input",
  },
  "--_elevated-shadow": {
    description: "Shadow of `.ui-elevated`. Defaults to `--ui-shadow-raised`.",
    kind: "input",
  },
  "--_motion": {
    description:
      "Motion multiplier for the focus ring animation. `0` turns it off.",
    kind: "input",
  },
  "--_outlined-border-color": {
    description:
      "Border color of `.ui-outlined`. Defaults to `--ui-border-color`.",
    kind: "input",
  },
  "--_shadow": {
    description:
      "The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`.",
    kind: "output",
  },
  "--_surface-bg-color": {
    description:
      "Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated`. Defaults to `--ui-surface-default`.",
    kind: "input",
  },
  "--_tonal-bg-color": {
    description: "Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.",
    kind: "input",
  },
} satisfies CustomProperties
