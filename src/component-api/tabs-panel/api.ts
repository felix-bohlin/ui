import type { ComponentApi } from "../types"

export default {
  component: "TabsPanel",
  options: [],
  page: "tabs",
  parts: [],
  root: {
    component: {
      astro: "TabsPanel",
      react: "TabsPanel",
      svelte: "TabsPanel",
      vue: "TabsPanel",
    },
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
