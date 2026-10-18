import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "CheckboxInput",
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
    ...components(
      "The checkbox `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    ),
    astro:
      "The checkbox `<input>` without the label, for a custom layout such as the end of a list item. Other attributes go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
  },
  options: [
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
