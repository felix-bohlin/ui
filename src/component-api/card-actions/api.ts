import type { ComponentApi } from "../types"

export default {
  component: "CardActions",
  options: [
    {
      default: '"end"',
      description: "Alignment for the actions.",
      group: "Alignment",
      prop: "align",
      values: { end: null, start: ".ui-align-start" },
    },
  ],
  page: "card",
  parts: [],
  root: {
    description: "A group of actions, such as buttons.",
    selector: ".ui-actions",
  },
  slots: [
    {
      description: "The actions, such as buttons.",
      name: "default",
    },
  ],
  source: "Card",
} satisfies ComponentApi
