import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "CheckboxInput",
  css: ["checkbox", "choice"],
  hydration: {
    react: [
      {
        description:
          "A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component loads the module once it hydrates, so the box looks unchecked until then.",
        fallback: "Import `opui-css/css/js/checkbox.js` in the page.",
        prop: "indeterminate",
      },
    ],
    solid: [
      {
        description:
          "A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs.",
        fallback: "Import `opui-css/css/js/checkbox.js` in the page.",
        prop: "indeterminate",
      },
    ],
    svelte: [
      {
        description:
          "A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs.",
        fallback: "Import `opui-css/css/js/checkbox.js` in the page.",
        prop: "indeterminate",
      },
    ],
    vue: [
      {
        description:
          "A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs.",
        fallback: "Import `opui-css/css/js/checkbox.js` in the page.",
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
    ...components(
      "The checkbox `<input>` without the label, for a custom layout inside a `label.ui-checkbox`, such as the end of a `ListItem` with `type=\"checkbox\"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    ),
  },
  options: [
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      attribute: "[data-indeterminate]",
      default: "false",
      description:
        "Shows a partially checked state. Sets the `indeterminate` property on the `<input>`.",
      group: "State",
      prop: "indeterminate",
    },
  ],
  page: "checkbox",
  parts: [],
  root: {
    code: '<input type="checkbox">',
    description: "The checkbox input, without a label.",
    selector: 'input[type="checkbox"]',
  },
  source: "Checkbox",
} satisfies ComponentApi
