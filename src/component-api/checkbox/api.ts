import type { ComponentApi } from "../types"

export default {
  component: "Checkbox",
  hydration: {
    vue: [
      {
        description:
          "A DOM property, set in `watchPostEffect`. The server renders `data-indeterminate`, but the box looks unchecked until hydration.",
        fallback:
          "Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.",
        prop: "indeterminate",
      },
    ],
  },
  model: {
    description: "The checked state, or the checked values of a group.",
    prop: "checked",
    type: "boolean | (string | number)[]",
  },
  notes: {
    astro:
      "Other attributes, such as `checked`, `disabled`, `name` and `required`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.",
    html: "Use `.ui-sr-only` instead of `.ui-label` to hide the label visually. `data-indeterminate` needs `checkbox.js`, which sets the `indeterminate` property.",
    vue: "Attributes that aren't props, such as `disabled` or `name`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.",
  },
  options: [
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      default: "false",
      description: "Visually hides the label.",
      prop: "hideLabel",
    },
    {
      attribute: "[data-indeterminate]",
      default: "false",
      description:
        "Shows a partially checked state. Sets the `indeterminate` property on the `<input>`.",
      group: "State",
      part: "input",
      prop: "indeterminate",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", small: ".ui-small" },
    },
    {
      class: ".ui-spread",
      default: "false",
      description: "Pushes the label and the input to opposite ends.",
      group: "Layout",
      prop: "spread",
    },
    {
      class: ".ui-stack",
      default: "false",
      description: "Stacks the label under the input.",
      group: "Layout",
      prop: "stack",
    },
  ],
  parts: [
    {
      code: "<input>",
      description: "The checkbox input.",
      model: true,
      selector: "input",
    },
    {
      description: "The label.",
      selector: ".ui-label",
      slots: ["default"],
    },
    {
      description: "Supporting text displayed below the label.",
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-checkbox",
  },
  source: "Checkbox",
} satisfies ComponentApi
