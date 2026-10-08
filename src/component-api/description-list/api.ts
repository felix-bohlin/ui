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
    {
      class: ".ui-inline",
      default: "false",
      description:
        "Keeps the term and the description side by side at any width. Without it they stack when the list is `45ch` or narrower.",
      group: "Layout",
      prop: "inline",
    },
  ],
  parts: [
    {
      component: {
        astro: "DescriptionList.Item",
        svelte: "DescriptionListItem",
        vue: "DescriptionListItem",
      },
      description: "Groups a term with its description.",
      selector: ".ui-item",
    },
    {
      code: "<dt>",
      component: {
        astro: "DescriptionList.Term",
        svelte: "DescriptionListTerm",
        vue: "DescriptionListTerm",
      },
      description: "The term.",
      selector: "dt",
    },
    {
      code: "<dd>",
      component: {
        astro: "DescriptionList.Description",
        svelte: "DescriptionListDescription",
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
