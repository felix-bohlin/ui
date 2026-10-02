import type { ComponentApi } from "../types"

export default {
  component: "Combobox",
  model: {
    description: "The checked value, or values with `multiple`.",
    prop: "value",
    type: "string | string[]",
  },
  notes: {
    astro:
      "Other attributes go to the root `<div>`. Extra options in the default slot are `<label>` elements with a radio or checkbox inside.",
    html: "Radios make a single select and checkboxes make a multiselect. The `<button>` is labelled by `.ui-label` and the list, so it reads out the checked options.",
    vue: "Attributes that aren't props go to the root `<div>`. Extra options in the default slot are `<label>` elements with a radio or checkbox inside.",
  },
  options: [
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the button and every option.",
      group: "Disabled",
      part: "button",
      prop: "disabled",
    },
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      description: "The id of the list.",
      frameworks: ["astro", "vue"],
      prop: "id",
      type: "string",
    },
    {
      default: "[]",
      description: "The options, as `{ disabled, text, value }` objects.",
      prop: "items",
    },
    {
      attribute: '[type="checkbox"]',
      default: "false",
      description: "Lets several options be checked.",
      group: "Multiple",
      part: "input",
      prop: "multiple",
    },
    {
      default: "A generated name",
      description: "The name of the options.",
      prop: "name",
      type: "string",
    },
    {
      attribute: "[required]",
      default: "false",
      description: "Requires an option to be checked. Single select only.",
      group: "Validation",
      part: "input",
      prop: "required",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { small: ".ui-small" },
    },
    {
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the label and description to one side and the field to the other.",
      group: "Layout",
      prop: "spread",
    },
    {
      description: "The checked value, or values with `multiple`.",
      frameworks: ["astro"],
      prop: "value",
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
      props: ["description"],
      selector: ".ui-start-text",
      slots: ["description"],
    },
    {
      description: "The boxed area.",
      selector: ".ui-field",
    },
    {
      code: "<button>",
      description:
        'Opens the list with `command="toggle-popover"`. Covers the field.',
      selector: "button",
    },
    {
      description: "Shown until an option is checked.",
      props: ["placeholder"],
      selector: ".ui-placeholder",
    },
    {
      description:
        "The options. Shows the checked ones in the field when closed, and covers the field when open.",
      model: true,
      selector: ".ui-list[popover]",
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
    selector: "div.ui-combobox",
  },
  slots: [
    {
      description: "Extra options.",
      name: "default",
    },
  ],
  source: "Combobox",
} satisfies ComponentApi
