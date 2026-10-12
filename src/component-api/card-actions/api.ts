import type { ComponentApi } from "../types"

export default {
  component: "CardActions",
  file: "CardActions",
  options: [
    {
      description: "Alignment for the actions.",
      group: "Alignment",
      prop: "align",
      values: { end: ".ui-align-end", start: null },
    },
  ],
  page: "card",
  parts: [],
  root: {
    component: {
      astro: "CardActions",
      react: "CardActions",
      svelte: "CardActions",
      vue: "CardActions",
    },
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
