import type { ComponentApi } from "../types"

export default {
  component: "TextField",
  notes: {
    astro:
      "Attributes go to the root `<label>`. Input attributes go on `TextFieldInput`.",
    html: "The control can also be a `<select>` or `<textarea>`. You can put a `<datalist>` inside the root.",
    react:
      "Attributes go to the root `<label>`. Input attributes go on `TextFieldInput`.",
    svelte:
      "Attributes go to the root `<label>`. Input attributes go on `TextFieldInput`.",
    vue: "Attributes go to the root `<label>`. Input attributes go on `TextFieldInput`.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description: "Lets the width follow the content, from `25ch`.",
      group: "Auto-fit",
      prop: "autoFit",
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
      description:
        "Pushes the label and description to one side and the input to the other.",
      group: "Layout",
      prop: "spread",
    },
    {
      default: '"outlined"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { filled: ".ui-filled", outlined: null },
    },
  ],
  parts: [
    {
      component: {
        astro: "TextFieldLabel",
        react: "TextFieldLabel",
        svelte: "TextFieldLabel",
        vue: "TextFieldLabel",
      },
      description: "The label for the field.",
      selector: ".ui-label",
    },
    {
      component: {
        astro: "TextFieldStartText",
        react: "TextFieldStartText",
        svelte: "TextFieldStartText",
        vue: "TextFieldStartText",
      },
      description: "Description text displayed above the field.",
      selector: ".ui-start-text",
    },
    {
      component: {
        astro: "TextFieldControl",
        react: "TextFieldControl",
        svelte: "TextFieldControl",
        vue: "TextFieldControl",
      },
      description: "The boxed input area. Holds the input and the affixes.",
      selector: ".ui-field",
    },
    {
      component: {
        astro: "TextFieldHeader",
        react: "TextFieldHeader",
        svelte: "TextFieldHeader",
        vue: "TextFieldHeader",
      },
      description:
        "Content above the input, inside the border, with a divider.",
      selector: ".ui-header",
    },
    {
      component: {
        astro: "TextFieldPrefix",
        react: "TextFieldPrefix",
        svelte: "TextFieldPrefix",
        vue: "TextFieldPrefix",
      },
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-prefix",
    },
    {
      code: "<input>",
      component: {
        astro: "TextFieldInput",
        react: "TextFieldInput",
        svelte: "TextFieldInput",
        vue: "TextFieldInput",
      },
      description: "The input element.",
      selector: "input",
    },
    {
      component: {
        astro: "TextFieldSuffix",
        react: "TextFieldSuffix",
        svelte: "TextFieldSuffix",
        vue: "TextFieldSuffix",
      },
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-suffix",
    },
    {
      component: {
        astro: "TextFieldFooter",
        react: "TextFieldFooter",
        svelte: "TextFieldFooter",
        vue: "TextFieldFooter",
      },
      description:
        "Content below the input, inside the border, with a divider.",
      selector: ".ui-footer",
    },
    {
      component: {
        astro: "TextFieldEndText",
        react: "TextFieldEndText",
        svelte: "TextFieldEndText",
        vue: "TextFieldEndText",
      },
      description:
        "Supporting text displayed below the field. Linked to the input through `aria-describedby`.",
      selector: ".ui-end-text",
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-text-field",
  },
  slots: [
    {
      description: "The field parts, and extra content such as a `<datalist>`.",
      name: "default",
    },
  ],
  source: "TextField",
} satisfies ComponentApi
