import type { ComponentApi } from "../types"

export default {
  component: "List",
  options: [
    {
      class: ".ui-bordered",
      default: "false",
      description: "Adds a border between list items.",
      group: "Bordered",
      prop: "bordered",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the list tighter.",
      group: "Dense",
      prop: "dense",
    },
    {
      class: ".ui-gutterless",
      default: "false",
      description: "Removes the inline padding.",
      group: "Gutterless",
      prop: "gutterless",
    },
    {
      description:
        "The background color variant. Without one, the list uses the filled surface.",
      group: "Variants",
      prop: "variant",
      values: {
        tonal: ".ui-tonal",
        transparent: ".ui-transparent",
      },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: { astro: "ListItem", svelte: "ListItem", vue: "ListItem" },
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
