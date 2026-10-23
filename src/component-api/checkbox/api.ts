import type { ComponentApi } from "../types"

export default {
  component: "Checkbox",
  css: ["checkbox", "choice"],
  hydration: {
    react: [
      {
        description:
          "A DOM property, set in a layout effect. The server renders `data-indeterminate`, but the box looks unchecked until hydration.",
        fallback:
          "Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.",
        prop: "indeterminate",
      },
    ],
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
      "Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `required`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
    html: "`data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange`, or `defaultChecked`. For a group, keep the checked values in your own state.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
  },
  options: [
    {
      attribute: "[disabled]",
      description: "Dims the checkbox and shows a not-allowed cursor.",
      frameworks: ["html"],
      group: "Disabled",
      part: "input",
      prop: "disabled",
    },
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "input",
      prop: "error",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`.",
      group: "Label",
      part: ".ui-checkbox > span",
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
      default: '"horizontal"',
      description:
        "The orientation of the element. `vertical` stacks the label under the input.",
      group: "Orientation",
      prop: "orientation",
      values: { horizontal: null, vertical: ".ui-vertical" },
    },
    {
      attribute: "[required]",
      description: "Adds a required mark after the label.",
      frameworks: ["html"],
      group: "Required",
      part: "input",
      prop: "required",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      class: ".ui-spread",
      default: "false",
      description: "Pushes the label and the input to opposite ends.",
      group: "Spread",
      prop: "spread",
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
      props: ["label"],
      selector: ".ui-label",
      slots: ["default"],
    },
    {
      description: "Supporting text displayed below the label.",
      props: ["endText"],
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
