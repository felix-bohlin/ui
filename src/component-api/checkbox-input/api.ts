import type { ComponentApi } from "../types"

export default {
  component: "CheckboxInput",
  file: "CheckboxInput",
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
      "Attributes go to the `<input>`, like `checked`, `disabled`, `name` and `required`.",
    react:
      "Attributes go to the `<input>`, like `disabled` or `name`. Use `checked` with `onChange`, or `defaultChecked`. For a group, keep the checked values in your own state.",
    svelte:
      "Attributes go to the `<input>`, like `disabled` or `name`. `aria-describedby` only points at the end text after hydration.",
    vue: "Attributes go to the `<input>`, like `disabled` or `name`.",
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
    code: "<input>",
    component: {
      astro: "CheckboxInput",
      react: "CheckboxInput",
      svelte: "CheckboxInput",
      vue: "CheckboxInput",
    },
    description: "The checkbox input.",
    selector: ".ui-checkbox input",
  },
  source: "Checkbox",
} satisfies ComponentApi
