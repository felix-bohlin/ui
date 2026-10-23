import type { ComponentApi } from "../types"

export default {
  component: "Tabs",
  notes: {
    html: 'Each tab is three elements, in this order: `input.ui-tab-input[type="radio"]`, `label.ui-tab-label` and `.ui-tab-panel`.',
  },
  options: [
    {
      attribute: "[name]",
      description: "The name shared by the tab inputs. Generated when omitted.",
      group: "Group",
      htmlDescription: "The name shared by the tab inputs.",
      part: ".ui-tab-input",
      prop: "name",
    },
    {
      class: ".ui-scrollable",
      default: "false",
      description:
        "Keeps the tabs on one row and scrolls them sideways when they don't fit.",
      group: "Scroll",
      prop: "scrollable",
    },
    {
      default: '"tonal"',
      description:
        "The variant to use. Without one the tabs sit on a tonal track and the selected tab is a raised pill.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        line: ".ui-line",
        outlined: ".ui-outlined",
        tonal: null,
      },
    },
  ],
  parts: [
    {
      code: ".ui-tab-input",
      component: "TabsItem",
      description:
        "A visually hidden radio input that holds a tab's state. The tab is its label.",
      selector: ".ui-tab-input:not(:checked) + .ui-tab-label",
    },
    {
      code: ".ui-tab-label",
      component: "TabsTab",
      description: "A tab.",
      selector: ".ui-tab-input:checked + .ui-tab-label",
    },
    {
      code: ".ui-tab-panel",
      component: "TabsPanel",
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
