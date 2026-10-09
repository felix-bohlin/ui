import type { ComponentApi } from "../types"

export default {
  component: "Checkbox",
  hydration: {
    svelte: [
      {
        description:
          "A DOM property, set in an `{@attach}`. The server renders `data-indeterminate`, but the box looks unchecked until hydration.",
        fallback:
          "Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.",
        prop: "indeterminate",
      },
    ],
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
    frameworks: {
      svelte: [
        {
          description: "The checked state.",
          prop: "checked",
          type: "boolean",
        },
        {
          description: "The checked values of a group.",
          prop: "group",
          type: "(string | number)[]",
        },
      ],
    },
    prop: "checked",
    type: "boolean | (string | number)[]",
  },
  notes: {
    astro:
      "Other attributes go to the `<input>`, like `checked`, `disabled`, `name` and `required`. To hide the label, set `hideLabel` and keep the text in the slot.",
    html: "To hide the label, use `.ui-sr-only` instead of `.ui-label`. `data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`. To hide the label, set `hideLabel` and keep the text in `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `name`. To hide the label, set `hideLabel` and keep the text in the slot.",
  },
  options: [
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "input",
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
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
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
