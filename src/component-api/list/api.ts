import type { ComponentApi } from "../types"

export default {
  component: "List",
  options: [
    {
      class: ".ui-bordered",
      default: "false",
      description: "Adds a border between list items.",
      group: "Borders",
      prop: "bordered",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the items tighter.",
      group: "Dense",
      prop: "dense",
    },
    {
      class: ".ui-flush",
      default: "false",
      description: "Removes the inline padding.",
      group: "Flush",
      prop: "flush",
    },
    {
      default: '"filled"',
      description:
        "The variant to use. The default `filled` list uses the filled surface.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: null,
        tonal: ".ui-tonal",
        transparent: ".ui-transparent",
      },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: "ListItem",
      description: "A list item.",
      selector: ".ui-list > li",
    },
  ],
  root: {
    description: "Container element.",
    selector: "ul.ui-list",
  },
  slots: [
    {
      description: "The list items.",
      name: "default",
    },
  ],
  source: "List",
} satisfies ComponentApi
