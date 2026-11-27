import type { ComponentApi } from "../types"

export default {
  component: "DescriptionList",
  options: [
    {
      description:
        "The style of the leader, the line between the term and the description. Without it, there's no line.",
      group: "Leader",
      prop: "leader",
      values: { dotted: ".ui-leader-dotted", solid: ".ui-leader-solid" },
    },
    {
      default: '"auto"',
      description:
        "The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width, and `vertical` always stacks them.",
      group: "Orientation",
      prop: "orientation",
      values: {
        auto: null,
        horizontal: ".ui-horizontal",
        vertical: ".ui-vertical",
      },
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
