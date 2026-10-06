import type { ComponentApi } from "../types"

export default {
  component: "DescriptionList",
  options: [
    {
      class: ".ui-bordered",
      default: "false",
      description: "Adds a border between the term and the description.",
      group: "Bordered",
      prop: "bordered",
      values: { dotted: ".ui-bordered.ui-dotted" },
    },
  ],
  parts: [
    {
      component: {
        astro: "DescriptionList.Item",
        solid: "DescriptionListItem",
        vue: "DescriptionListItem",
      },
      description: "Groups a term with its description.",
      selector: ".ui-item",
    },
    {
      code: "<dt>",
      component: {
        astro: "DescriptionList.Term",
        solid: "DescriptionListTerm",
        vue: "DescriptionListTerm",
      },
      description: "The term.",
      selector: "dt",
    },
    {
      code: "<dd>",
      component: {
        astro: "DescriptionList.Description",
        solid: "DescriptionListDescription",
        vue: "DescriptionListDescription",
      },
      description: "The description.",
      selector: "dd",
    },
  ],
  root: {
    description: "Container element.",
    selector: "dl.ui-description-list",
  },
  slots: [
    {
      description: "The items.",
      name: "default",
    },
  ],
  source: "DescriptionList",
} satisfies ComponentApi
