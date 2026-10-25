import type { CustomProperties } from "../types"

export default {
  "--_count-digits": {
    description:
      "Digits reserved for the numbers of an `ol`, from its number of items.",
    kind: "output",
  },
  "--_flow-gap": {
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
  "--_swatch-bg-color": {
    description:
      "Fill of `.ui-swatch`. Defaults to `--ui-palette-accent`, the accent of the color class on the swatch or of the surrounding severity scope.",
    kind: "input",
  },
} satisfies CustomProperties
