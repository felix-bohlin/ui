import type { ComponentApi } from "../types"

export default {
  component: "TabsLabel",
  options: [
    {
      attribute: "[for]",
      description: "The id of the input it labels. Set by the item.",
      frameworks: ["astro", "svelte", "vue"],
      group: "For",
      htmlDescription: "The id of the input it labels.",
      inherited: true,
      prop: "for",
      type: "string",
    },
    {
      description:
        "The id of the input it labels, as `htmlFor` like on the element. Set by the item.",
      frameworks: ["react"],
      inherited: true,
      prop: "htmlFor",
      type: "string",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
    description: "The tab.",
    selector: "label.ui-label",
  },
  slots: [
    {
      description: "The tab label.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
