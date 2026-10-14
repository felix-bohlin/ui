import type { ComponentApi } from "../types"

export default {
  component: "TabsTab",
  options: [
    {
      description: "The id of the input it labels. Set by the item.",
      prop: "tabId",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
    component: {
      astro: "TabsTab",
      react: "TabsTab",
      svelte: "TabsTab",
      vue: "TabsTab",
    },
    description: "The tab.",
    selector: "label.ui-tab-label",
  },
  slots: [
    {
      description: "The tab label.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
