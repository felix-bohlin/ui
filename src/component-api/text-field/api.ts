import type { ComponentApi } from "../types"

export default {
  component: "TextField",
  model: {
    description: "The input value.",
    prop: "value",
    type: "string | number",
  },
  notes: {
    astro:
      "Input attributes (`disabled`, `list`, `max`, `min`, `name`, `placeholder`, `required`, `step`, `value`) go to the `<input>`. Other attributes go to the root `<label>`.",
    html: "The control can also be a `<select>` or `<textarea>`. A `<datalist>` can be placed inside the root.",
    vue: "Attributes that aren't props, such as `placeholder` or `disabled`, go to the `<input>`.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description: "Changes size depending on its content.",
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
      description: "The id of the `<input>`.",
      frameworks: ["astro", "vue"],
      prop: "id",
      type: "string",
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
      default: '"text"',
      description:
        'The input type. `"numeric"` renders a text input with a numeric keyboard.',
      frameworks: ["astro", "vue"],
      prop: "type",
      type: '"numeric" | string',
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
      description: "Description text displayed above the field.",
      legacy: { props: ["startText"] },
      props: ["description"],
      selector: ".ui-start-text",
      slots: ["description"],
    },
    {
      description: "The boxed input area.",
      selector: ".ui-field",
    },
    {
      description:
        "Content above the input, inside the border, with a divider.",
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
      code: "<input>",
      description: "The input element.",
      model: true,
      selector: "input",
    },
    {
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-suffix",
      slots: ["suffix"],
    },
    {
      description:
        "Content below the input, inside the border, with a divider.",
      selector: ".ui-footer",
      slots: ["footer"],
    },
    {
      description: "Supporting text displayed below the field.",
      legacy: { slots: ["supporting-text"] },
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-text-field",
  },
  slots: [
    {
      description: "Extra content inside the root, such as a `<datalist>`.",
      name: "default",
    },
  ],
  source: "TextField",
} satisfies ComponentApi
