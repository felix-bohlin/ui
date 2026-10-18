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
      "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.",
    html: "The control can also be a `<select>` or `<textarea>`. You can put a `<datalist>` inside the root.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `style` goes to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `style` goes to the root `<label>`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.",
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
      description: "The id of the `<input>`.",
      inherited: true,
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
        "Pushes the label and start text to one side and the input to the other.",
      group: "Layout",
      prop: "spread",
    },
    {
      default: '"text"',
      description:
        'The input type. `"numeric"` renders a text input with a numeric keyboard.',
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
      description: "Start text displayed above the field.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
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
