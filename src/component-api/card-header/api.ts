import type { ComponentApi } from "../types"

export default {
  component: "CardHeader",
  options: [
    {
      default: '"hgroup"',
      description:
        "The element to render. Use `div` for a header row with an avatar or a button next to the heading, and put the heading in an `hgroup` inside it.",
      htmlDescription:
        "A `div.ui-header` with an `hgroup` inside is a row: the `hgroup` takes the free space, so an avatar before it and buttons after it line up on one row.",
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
