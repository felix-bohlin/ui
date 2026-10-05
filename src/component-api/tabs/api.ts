import type { ComponentApi } from "../types"

export default {
  component: "Tabs",
  notes: {
    html: 'Each tab is an `input.ui-tab-input[type="radio"]`, followed by its `label.ui-tab-label` and `.ui-tab-panel`.',
  },
  options: [
    {
      attribute: "[name]",
      description: "The name shared by the tab inputs. Generated when omitted.",
      group: "Group",
      part: ".ui-tab-input",
      prop: "name",
    },
    {
      class: ".ui-scrollable",
      default: "false",
      description:
        "Keeps the tabs on one row and scrolls them sideways when they don't fit. Supports up to 20 tabs.",
      group: "Overflow",
      prop: "scrollable",
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        line: ".ui-line",
        outlined: ".ui-outlined",
      },
    },
  ],
  parts: [
    {
      code: ".ui-tab-input",
      component: { astro: "Tabs.Item", svelte: "TabsItem", vue: "TabsItem" },
      description: "A visually hidden radio input that holds a tab's state.",
      selector: ".ui-tab-input:checked",
    },
    {
      code: ".ui-tab-label",
      component: { astro: "Tabs.Tab", svelte: "TabsTab", vue: "TabsTab" },
      description: "A tab.",
      selector: ".ui-tab-input:checked + .ui-tab-label",
    },
    {
      code: ".ui-tab-panel",
      component: { astro: "Tabs.Panel", svelte: "TabsPanel", vue: "TabsPanel" },
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
