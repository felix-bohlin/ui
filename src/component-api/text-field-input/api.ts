import type { ComponentApi } from "../types"

export default {
  component: "TextFieldInput",
  file: "TextFieldInput",
  model: {
    description: "The input value.",
    prop: "value",
    type: "string | number",
  },
  notes: {
    astro:
      "Attributes go to the `<input>`, like `disabled`, `name`, `placeholder` or `required`.",
    react:
      "Attributes go to the `<input>`, like `disabled`, `name` or `placeholder`. Use `value` with `onChange`, or `defaultValue`.",
    svelte:
      "Attributes go to the `<input>`, like `disabled`, `name` or `placeholder`. `aria-describedby` only points at the end text after hydration.",
    vue: "Attributes go to the `<input>`, like `disabled`, `name` or `placeholder`.",
  },
  options: [
    {
      default: '"text"',
      description:
        'The input type. `"numeric"` renders a text input with a numeric keyboard.',
      frameworks: ["astro", "react", "svelte", "vue"],
      prop: "type",
      type: '"numeric" | string',
    },
  ],
  page: "text-field",
  parts: [],
  root: {
    code: "<input>",
    component: {
      astro: "TextFieldInput",
      react: "TextFieldInput",
      svelte: "TextFieldInput",
      vue: "TextFieldInput",
    },
    description: "The input element.",
    selector: ".ui-text-field input",
  },
  source: "TextField",
} satisfies ComponentApi
