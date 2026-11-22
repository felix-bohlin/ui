import type { ComponentApi } from "../types"

export default {
  component: "TabsPanel",
  options: [],
  page: "tabs",
  parts: [],
  root: {
    description: "The panel.",
    selector: ".ui-panel",
  },
  slots: [
    {
      description: "The panel content.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
