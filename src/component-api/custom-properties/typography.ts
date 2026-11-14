import type { CustomProperties } from "../types"

export default {
  "--_count-digits": {
    description:
      "Digits reserved for the numbers of an `ol`, from its number of items.",
    kind: "output",
  },
  "--_flow-after": {
    description:
      "Multiple of `--_flow-gap` below a rich text heading when `--ui-rich-text-heading-margin-block-end` is unset: 1 for `h1`, 0.75 for `h2` and 0.5 for `h3` to `h6`.",
    kind: "input",
  },
  "--_flow-before": {
    description:
      "Multiple of `--_flow-gap` above a rich text heading when `--ui-rich-text-heading-margin-block-start` is unset: 3 for `h1` and `h2`, 2 for `h3` and 1.5 for `h4` to `h6`.",
    kind: "input",
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
  "--_line-height": {
    description:
      "Line height of the element around inline `code` in `.ui-rich-text`, so the code's vertical padding fits in the space its line leaves.",
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
