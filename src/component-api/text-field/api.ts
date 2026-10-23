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
    html: "Use `.ui-select` for a `<select>` and `.ui-textarea` for a `<textarea>`. You can put a `<datalist>` inside the root.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `className` and `style` go to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `placeholder`, and `class` and `style` go to the root `<label>`.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description: "Lets the width follow the content, from `25ch`.",
      group: "Auto fit",
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
        "Pushes the label and start text to one side and the input to the other.",
      group: "Spread",
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
      selector: ".ui-field > .ui-top",
      slots: ["top"],
    },
    {
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-field > .ui-start",
      slots: ["start"],
    },
    {
      code: "<input>",
      description: "The input element.",
      model: true,
      selector: "input",
    },
    {
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-field > .ui-end",
      slots: ["end"],
    },
    {
      description:
        "Content below the input, inside the border, with a divider.",
      selector: ".ui-field > .ui-bottom",
      slots: ["bottom"],
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
