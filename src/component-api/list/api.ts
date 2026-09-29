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
      default: "false",
      description: "Currently has no effect.",
      prop: "divided",
    },
    {
      class: ".ui-gutterless",
      default: "false",
      description: "Removes the inline padding.",
      group: "Gutterless",
      prop: "gutterless",
    },
    {
      description: "The background color variant.",
      group: "Variants",
      prop: "variant",
      values: {
        default: ".ui-default",
        tonal: ".ui-tonal",
        transparent: ".ui-transparent",
      },
    },
  ],
  parts: [
    {
      code: "<li>",
      component: { astro: "ListItem", vue: "ListItem" },
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
