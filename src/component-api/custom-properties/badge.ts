import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The color the indicator background is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral` and `.ui-success`.",
    kind: "input",
  },
  "--_bg-color": {
    description:
      "Background of the indicator. Defaults to `--ui-primary`, set by the color classes.",
    kind: "output",
  },
  "--_border-color": {
    description: "Border color of the indicator. Set by the color classes.",
    kind: "output",
  },
  "--_border-width": {
    description: "Border width of the indicator.",
    kind: "input",
  },
  "--_direction": {
    description:
      "Direction flag that flips `--_shift-x`. `1`, or `-1` in right-to-left.",
    kind: "output",
  },
  "--_dot-size": {
    description: "Width and height of the indicator in `.ui-dot`.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the indicator fade, `--ui-duration` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the indicator fade. Defaults to `--ui-ease-enter`.",
    kind: "input",
  },
  "--_inset": {
    description:
      "Distance of the indicator from the opposite edges. `100%` places it on the corner, round avatars move it onto the circle.",
    kind: "input",
  },
  "--_inset-block": {
    description:
      "Block inset of the indicator, from `--_inset` and the corner classes.",
    kind: "output",
  },
  "--_inset-inline": {
    description:
      "Inline inset of the indicator, from `--_inset` and the corner classes.",
    kind: "output",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_shift-x": {
    description:
      "Horizontal shift of the indicator, from `--_sign-x`. `.ui-dot` and round avatars change it.",
    kind: "output",
  },
  "--_shift-y": {
    description:
      "Vertical shift of the indicator, from `--_sign-y`. `.ui-dot` and round avatars change it.",
    kind: "output",
  },
  "--_sign-x": {
    description:
      "Horizontal side of the indicator, `-1` or `1`. Set by the corner classes.",
    kind: "output",
  },
  "--_sign-y": {
    description:
      "Vertical side of the indicator, `1` or `-1`. Set by the corner classes.",
    kind: "output",
  },
  "--_size": {
    description: "Height and minimum width of the indicator.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "Text color of the indicator. Defaults to `--ui-on-primary`, set by the color classes.",
    kind: "output",
  },
} satisfies CustomProperties
