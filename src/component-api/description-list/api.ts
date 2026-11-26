import type { ComponentApi } from "../types"

export default {
  component: "DescriptionList",
  options: [
    {
      class: ".ui-bordered",
      default: "false",
      description: "Adds a line between the term and the description.",
      group: "Borders",
      prop: "bordered",
    },
    {
      class: ".ui-dotted",
      default: "false",
      description: "Makes the `bordered` line dotted.",
      group: "Dotted",
      htmlDescription: "Makes the `.ui-bordered` line dotted.",
      prop: "dotted",
    },
    {
      default: '"auto"',
      description:
        "The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width.",
      group: "Orientation",
      prop: "orientation",
      values: { auto: null, horizontal: ".ui-horizontal" },
    },
  ],
  parts: [
    {
      component: "DescriptionListItem",
      code: "<div>",
      description: "Groups a term with its description.",
      selector: "dl.ui-description-list > div",
    },
    {
      code: "<dt>",
      component: "DescriptionListTerm",
      description: "The term.",
      selector: "dt",
    },
    {
      code: "<dd>",
      component: "DescriptionListDescription",
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
