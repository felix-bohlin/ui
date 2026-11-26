import type { ComponentApi } from "../types"

export default {
  component: "TabsItem",
  notes: {
    react:
      "`defaultChecked` selects the starting tab. A tab that loses its check to another one fires no `onChange` of its own, so to control the tabs, give each item a `value` and set `value` with `onValueChange` on `Tabs`. The `Tabs` value then wins and an item's own `checked` and `defaultChecked` are ignored.",
    svelte:
      "`checked` selects the starting tab. A tab that loses its check to another one fires no `change` of its own, so to control the tabs, give each item a `value` and bind `value` on `Tabs`. The `Tabs` value then wins and an item's own `checked` is ignored.",
    vue: "`checked` selects the starting tab. A tab that loses its check to another one fires no `change` of its own, so to control the tabs, give each item a `value` and bind `v-model` on `Tabs`. The `Tabs` value then wins and an item's own `checked` is ignored.",
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
      attribute: "[id]",
      description: "The id of the input. Generated when omitted.",
      group: "Id",
      htmlDescription: "The id of the input, which the label points at.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description: "Overrides the name shared by the tab inputs.",
      prop: "name",
    },
    {
      attribute: "[value]",
      description:
        "The value of the input. The tab is selected while it matches the `value` of `Tabs`.",
      group: "Value",
      htmlDescription: "The value of the input, submitted with its form.",
      inherited: true,
      prop: "value",
      type: "string",
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
