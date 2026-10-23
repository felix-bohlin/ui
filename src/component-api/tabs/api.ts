import type { ComponentApi } from "../types"

export default {
  component: "Tabs",
  notes: {
    html: 'Each tab is three elements, in this order: `input.ui-input[type="radio"]`, `label.ui-label` and `.ui-panel`.',
  },
  options: [
    {
      attribute: "[name]",
      description: "The name shared by the tab inputs. Generated when omitted.",
      group: "Group",
      htmlDescription: "The name shared by the tab inputs.",
      part: ".ui-input",
      prop: "name",
    },
    {
      default: '"wrap"',
      description:
        'What the tabs do when they don\'t fit. `"wrap"` wraps them onto more rows, and `"scroll"` keeps them on one row and scrolls it sideways.',
      group: "Overflow",
      prop: "overflow",
      values: { scroll: ".ui-overflow-scroll", wrap: null },
    },
    {
      default: '"tonal"',
      description:
        "The variant to use. The default `tonal` tabs sit on a tonal track and the selected tab is a raised pill.",
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
      code: ".ui-input",
      component: "TabsItem",
      description:
        "A visually hidden radio input that holds a tab's state. The tab is its label.",
      selector: ".ui-input:not(:checked) + .ui-label",
    },
    {
      code: ".ui-label",
      component: "TabsLabel",
      description: "A tab.",
      selector: ".ui-input:checked + .ui-label",
    },
    {
      code: ".ui-panel",
      component: "TabsPanel",
      description: "The panel of the selected tab.",
      selector: ".ui-input:checked + .ui-label + .ui-panel",
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
