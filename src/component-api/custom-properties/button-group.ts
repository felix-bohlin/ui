import type { CustomProperties } from "../types"

export default {
  "--_bg-color": {
    description:
      "The current background of each button. Set by the group's variant, hover and active states.",
    kind: "output",
  },
  "--_border-color": {
    description: "Border color of each button, `transparent` in a group.",
    kind: "output",
  },
  "--_border-radius": {
    description:
      "Corner radius of the group. Defaults to `--button-border-radius`.",
    kind: "input",
  },
  "--_divider-color": {
    description:
      "Color of the lines between buttons, from the button's `--_accent-tonal`, or `--_accent` in `.ui-outlined` and `.ui-filled`.",
    kind: "output",
  },
  "--_edge-color": {
    description:
      "Outline color around the group. Set by `.ui-outlined`, with `.ui-primary` and `.ui-critical`.",
    kind: "input",
  },
  "--_font-size": {
    description: "Font size of each button. Set by the group's size classes.",
    kind: "input",
  },
  "--_icon-size": {
    description: "Icon size in icon-only buttons.",
    kind: "input",
  },
  "--_min-height": {
    description: "Height of each button. Set by the group's size classes.",
    kind: "input",
  },
  "--_padding-inline": {
    description:
      "Inline padding of each button. Set by the group's size classes.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color of each button. Set by the group's variant, hover and active states.",
    kind: "output",
  },
} satisfies CustomProperties
