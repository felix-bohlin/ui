import type { ComponentApi } from "../types"

export default {
  component: "CalloutTitle",
  file: "CalloutTitle",
  options: [
    {
      default: "3",
      description: "The heading level of the title.",
      frameworks: ["astro", "react", "svelte", "vue"],
      prop: "level",
    },
  ],
  page: "callout",
  parts: [],
  root: {
    code: "<h3>",
    component: {
      astro: "CalloutTitle",
      react: "CalloutTitle",
      svelte: "CalloutTitle",
      vue: "CalloutTitle",
    },
    description: "An optional title inside the content.",
    selector: ".ui-content > h3",
  },
  slots: [
    {
      description: "The title text.",
      name: "default",
    },
  ],
  source: "Callout",
} satisfies ComponentApi
