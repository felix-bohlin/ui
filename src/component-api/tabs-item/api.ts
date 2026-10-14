import type { ComponentApi } from "../types"

export default {
  component: "TabsItem",
  options: [
    {
      description: "Overrides the name shared by the tab inputs.",
      prop: "name",
    },
    {
      attribute: "[checked]",
      default: "false",
      description: "Selects the tab initially.",
      group: "State",
      prop: "open",
    },
    {
      description: "The id of the input. Generated when omitted.",
      prop: "tabId",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
    component: {
      astro: "TabsItem",
      react: "TabsItem",
      svelte: "TabsItem",
      vue: "TabsItem",
    },
    description:
      "The radio input for a tab, followed by the tab and the panel.",
    selector: "input.ui-tab-input",
  },
  slots: [
    {
      description: "The tab and the panel.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
