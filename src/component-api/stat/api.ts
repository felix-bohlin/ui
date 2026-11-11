import type { ComponentApi } from "../types"

export default {
  component: "Stat",
  options: [
    {
      description: "Text under the value, such as the change since last week.",
      group: "Description",
      prop: "description",
    },
    {
      description: "What the value counts, such as Visitors.",
      group: "Label",
      prop: "label",
    },
    {
      default: '"medium"',
      description: "The size of the value.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", medium: null, small: ".ui-small" },
    },
  ],
  parts: [
    {
      code: '<dt class="ui-label">',
      description: "The label.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["label"],
    },
    {
      code: '<dd class="ui-value">',
      description: "The value, in tabular numbers.",
      selector: ".ui-value",
      slots: ["default"],
    },
    {
      code: '<dd class="ui-description">',
      description: "The description.",
      props: ["description"],
      selector: ".ui-description",
      slots: ["description"],
    },
  ],
  root: {
    description:
      "A `dl` with the label, the value and the description, so a screen reader reads them as one term with its details.",
    selector: "dl.ui-stat",
  },
  slots: [
    {
      description: "The value.",
      name: "default",
    },
  ],
  source: "Stat",
} satisfies ComponentApi
