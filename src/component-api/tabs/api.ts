import type { ComponentApi } from "../types"

export default {
  component: "Tabs",
  keyboard: [
    {
      description:
        "Moves focus to the selected tab, then to the focusable elements in its panel, then out of the tabs. The other tabs aren't tab stops.",
      keys: ["Tab"],
    },
    {
      description:
        "Moves focus to the previous or next tab and selects it, wrapping around at the ends. Left and Right follow the reading direction.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
  model: {
    description: "The `value` of the selected tab.",
    prop: "value",
    type: "string",
  },
  notes: {
    astro:
      "`value` selects the item whose `value` matches on the server. After that the selection lives in the inputs: read it from the form, or listen for `change` in a script.",
    html: 'Each tab is three elements, in this order: `input.ui-input[type="radio"]`, `label.ui-label` and `.ui-panel`.',
    react:
      "Use `value` with `onValueChange`, or `defaultValue`. Without them the items keep their own state, and `onValueChange` still reports changes.",
    svelte:
      "Bind `value` with a starting value to control the selection. Without it, or bound to `undefined`, the items keep their own state.",
    vue: "Bind `v-model` with a starting value to control the selection. Without it, or bound to `undefined`, the items keep their own state.",
  },
  options: [
    {
      description:
        "The `value` of the tab selected at the start, when `value` is omitted.",
      frameworks: ["react"],
      prop: "defaultValue",
    },
    {
      attribute: "[name]",
      description: "The name shared by the tab inputs. Generated when omitted.",
      group: "Group",
      htmlDescription: "The name shared by the tab inputs.",
      part: ".ui-input",
      prop: "name",
    },
    {
      description: "Called with the `value` of the tab when one is selected.",
      frameworks: ["react"],
      prop: "onValueChange",
      type: "(value: string) => void",
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
    {
      description:
        "The `value` of the selected tab. The item whose `value` matches is checked, and the items' own `checked` is ignored.",
      frameworks: ["astro", "react"],
      prop: "value",
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
