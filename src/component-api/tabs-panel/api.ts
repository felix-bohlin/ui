import type { ComponentApi } from "../types"

export default {
  component: "Tabs.Panel",
  file: "TabsPanel",
  options: [],
  page: "tabs",
  parts: [],
  root: {
    component: { astro: "Tabs.Panel", solid: "TabsPanel", vue: "TabsPanel" },
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
