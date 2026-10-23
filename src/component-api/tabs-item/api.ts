import type { ComponentApi } from "../types"

export default {
  component: "TabsItem",
  notes: {
    react:
      "`defaultChecked` selects the starting tab. To control the tabs, keep the selected tab in one piece of state, set `checked` on every item from it and update it in each item's `onChange`: a tab that loses its check to another one fires no `onChange` of its own.",
  },
  options: [
    {
      attribute: "[checked]",
      default: "false",
      description: "Selects the tab.",
      group: "Checked",
      htmlDescription: "Selects the tab initially.",
      prop: "checked",
    },
    {
      description: "Overrides the name shared by the tab inputs.",
      prop: "name",
    },
    {
      attribute: "[id]",
      description: "The id of the input. Generated when omitted.",
      group: "Id",
      htmlDescription: "The id of the input.",
      prop: "tabId",
    },
  ],
  page: "tabs",
  parts: [],
  root: {
    description:
      "The radio input for a tab, followed by the tab and the panel.",
    selector: "input.ui-input",
  },
  slots: [
    {
      description: "The tab and the panel.",
      name: "default",
    },
  ],
  source: "Tabs",
} satisfies ComponentApi
