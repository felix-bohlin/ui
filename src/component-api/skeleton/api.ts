import type { ComponentApi } from "../types"

export default {
  component: "Skeleton",
  options: [
    {
      default: '"rounded"',
      description:
        "The corners: `rounded` like a card or an image, `circle` for an avatar, `squared` for a block that runs edge to edge.",
      group: "Shape",
      prop: "shape",
      values: { circle: ".ui-circle", rounded: null, squared: ".ui-squared" },
    },
    {
      class: ".ui-line",
      description:
        "A line of text: as tall as a line of the surrounding text, with space between lines. The last of several lines is shorter.",
      group: "Line",
      prop: "line",
    },
  ],
  parts: [],
  root: {
    description:
      "An empty `span` with `aria-hidden`. Mark the region that's loading with `aria-busy` instead, so screen readers wait for the real content.",
    selector: "span.ui-skeleton",
  },
  slots: [],
  source: "Skeleton",
} satisfies ComponentApi
