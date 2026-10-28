import type { ComponentApi } from "../types"

export default {
  component: "DescriptionListItem",
  options: [
    {
      class: ".ui-total",
      default: "false",
      description:
        "Marks the item as the total of the list: a line above it, larger bold text and the strong text color, for the last row of an order summary.",
      group: "Total",
      prop: "total",
    },
  ],
  page: "description-list",
  parts: [],
  root: {
    description: "Groups a term with its description.",
    selector: "dl.ui-description-list > div",
  },
  slots: [
    {
      description: "The term and the description.",
      name: "default",
    },
  ],
  source: "DescriptionList",
} satisfies ComponentApi
