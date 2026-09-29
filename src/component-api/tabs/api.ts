import type { ComponentApi } from "../types"

export default {
  component: "Tabs",
  notes: {
    html: 'The root needs `role="tablist"`. Each tab is an `input.ui-tab-input[type="radio"]`, followed by its `label.ui-tab-label[role="tab"]` and `.ui-tab-panel[role="tabpanel"]`.',
  },
  options: [
    {
      attribute: "[name]",
      description: "The name shared by the tab inputs. Generated when omitted.",
      group: "Group",
      part: ".ui-tab-input",
      prop: "name",
    },
  ],
  parts: [
    {
      code: ".ui-tab-input",
      component: { astro: "Tabs.Item", vue: "TabsItem" },
      description: "A visually hidden radio input that holds a tab's state.",
      selector: ".ui-tab-input:checked",
    },
    {
      code: ".ui-tab-label",
      component: { astro: "Tabs.Tab", vue: "TabsTab" },
      description: "A tab.",
      selector: ".ui-tab-input:checked + .ui-tab-label",
    },
    {
      code: ".ui-tab-panel",
      component: { astro: "Tabs.Panel", vue: "TabsPanel" },
      description: "The panel of the selected tab.",
      selector: ".ui-tab-input:checked + .ui-tab-label + .ui-tab-panel",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-tabs",
  },
  slots: [
    {
      description: "The tab items.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
