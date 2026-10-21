import type { ComponentApi } from "../types"

export default {
  component: "TabsTab",
  options: [
    {
      attribute: "[for]",
      description: "The id of the input it labels. Set by the item.",
      group: "For",
      htmlDescription: "The id of the input it labels.",
      prop: "tabId",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
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
