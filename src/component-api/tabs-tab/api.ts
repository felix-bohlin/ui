import type { ComponentApi } from "../types"

export default {
  component: "Tabs.Tab",
  file: "TabsTab",
  options: [
    {
      description: "The id of the input it labels. Set by the item.",
      prop: "tabId",
    },
  ],
  parts: [],
  root: {
    component: { astro: "Tabs.Tab", vue: "TabsTab" },
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
