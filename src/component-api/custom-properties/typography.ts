import type { CustomProperties } from "../types"

export default {
  "--_count-digits": {
    description:
      "Digits reserved for the numbers of an `ol`, from its number of items.",
    kind: "output",
  },
  "--_flow-space": {
    description:
      "Space between blocks in `.ui-rich-text`. Heading, `hr` and `figure` margins are multiples of it.",
    kind: "input",
  },
  "--_font-scale": {
    description:
      "Ratio of `1em` to `1rem` that scales heading sizes with the surrounding font size.",
    kind: "output",
  },
  "--_start-digits": {
    description:
      "Digits reserved for the numbers of an `ol`, from its `start` attribute.",
    kind: "output",
  },
  "--_text-color": {
    description:
      "Text and underline color of links without a `ui-` class in `.ui-rich-text`. Defaults to `--ui-primary-text`.",
    kind: "input",
  },
} satisfies CustomProperties
