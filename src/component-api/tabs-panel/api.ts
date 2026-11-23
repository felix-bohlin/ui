import type { ComponentApi } from "../types"

export default {
  component: "Tabs.Panel",
  file: "TabsPanel",
  options: [
    {
      description: "The id of the panel. Set by the item.",
      prop: "panelId",
    },
    {
      description: "The id of the tab input that labels it. Set by the item.",
      prop: "tabId",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
    component: { astro: "Tabs.Panel", vue: "TabsPanel" },
    description: "The panel.",
    selector: ".ui-tab-panel",
  },
  slots: [
    {
      description: "The panel content.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
