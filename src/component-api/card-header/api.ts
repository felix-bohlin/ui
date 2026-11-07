import type { ComponentApi } from "../types"

export default {
  component: "CardHeader",
  options: [
    {
      default: '"hgroup"',
      description:
        "The element to render. Use `div` for a header row with an avatar or a button next to the heading, and put the heading in an `hgroup` inside it. Use `header` for the same row in an `article` card.",
      htmlDescription:
        "A `div.ui-header` or `header.ui-header` with an `hgroup` inside is a row: the `hgroup` takes the free space, so an avatar before it and buttons after it line up on one row. Use the `header` in an `article` card.",
      prop: "as",
    },
  ],
  page: "card",
  parts: [],
  root: {
    description: "The card header.",
    selector: ".ui-header",
  },
  slots: [
    {
      description:
        "The heading and its paragraphs, or an `hgroup` with anything next to it.",
      name: "default",
    },
  ],
  source: "Card",
} satisfies ComponentApi
