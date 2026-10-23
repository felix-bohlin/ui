import type { ComponentApi } from "../types"

export default {
  component: "Textarea",
  css: ["text-field", "textarea"],
  model: {
    description: "The textarea value.",
    prop: "value",
    type: "string",
  },
  notes: {
    astro:
      "Attributes that aren't props go to the `<textarea>`, like `placeholder` or `rows`, and `class` and `style` go to the root `<label>`.",
    react:
      "Attributes that aren't props go to the `<textarea>`, like `placeholder` or `rows`, and `className` and `style` go to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.",
    svelte:
      "Attributes that aren't props go to the `<textarea>`, like `placeholder` or `rows`, and `class` and `style` go to the root `<label>`.",
    vue: "Attributes that aren't props go to the `<textarea>`, like `placeholder` or `rows`, and `class` and `style` go to the root `<label>`.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description:
        "Lets the width follow the content and allows resizing in both directions.",
      group: "Auto-fit",
      prop: "autoFit",
    },
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "textarea",
      prop: "error",
    },
    {
      description: "The id of the `<textarea>`.",
      inherited: true,
      prop: "id",
      type: "string",
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
      description:
        "Pushes the label and start text to one side and the textarea to the other.",
      group: "Spread",
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
      description: "The label for the field.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["label"],
    },
    {
      description: "Start text displayed above the field.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      description: "The boxed textarea area.",
      selector: ".ui-field",
    },
    {
      description:
        "Content above the textarea, inside the border, with a divider.",
      selector: ".ui-header",
      slots: ["header"],
    },
    {
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-prefix",
      slots: ["prefix"],
    },
    {
      code: "<textarea>",
      description: "The textarea element.",
      model: true,
      selector: "textarea",
    },
    {
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-suffix",
      slots: ["suffix"],
    },
    {
      description:
        "Content below the textarea, inside the border, with a divider.",
      selector: ".ui-footer",
      slots: ["footer"],
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-textarea",
  },
  slots: [
    {
      description: "Extra content inside the root.",
      name: "default",
    },
  ],
  source: "Textarea",
} satisfies ComponentApi
