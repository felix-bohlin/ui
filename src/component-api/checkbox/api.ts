import type { ComponentApi } from "../types"

export default {
  component: "Checkbox",
  notes: {
    astro:
      "Attributes go to the root `<label>`. Input attributes go on `CheckboxInput`.",
    html: "To hide the label, use `.ui-sr-only` instead of `.ui-label`. `data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.",
    react:
      "Attributes go to the root `<label>`. Input attributes go on `CheckboxInput`.",
    svelte:
      "Attributes go to the root `<label>`. Input attributes go on `CheckboxInput`.",
    vue: "Attributes go to the root `<label>`. Input attributes go on `CheckboxInput`.",
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
      component: {
        astro: "CheckboxInput",
        react: "CheckboxInput",
        svelte: "CheckboxInput",
        vue: "CheckboxInput",
      },
      description: "The checkbox input.",
      selector: "input",
    },
    {
      component: {
        astro: "CheckboxLabel",
        react: "CheckboxLabel",
        svelte: "CheckboxLabel",
        vue: "CheckboxLabel",
      },
      description: "The label.",
      selector: ".ui-label",
    },
    {
      component: {
        astro: "CheckboxEndText",
        react: "CheckboxEndText",
        svelte: "CheckboxEndText",
        vue: "CheckboxEndText",
      },
      description:
        "Supporting text displayed below the label. Linked to the input through `aria-describedby`.",
      selector: ".ui-end-text",
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-checkbox",
  },
  slots: [
    {
      description: "The checkbox parts.",
      name: "default",
    },
  ],
  source: "Checkbox",
} satisfies ComponentApi
