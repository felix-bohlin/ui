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
      "Textarea attributes (`cols`, `disabled`, `maxlength`, `minlength`, `name`, `placeholder`, `required`, `rows`, `value`) go to the `<textarea>`. Other attributes go to the root `<label>`.",
    vue: "Attributes that aren't props, such as `placeholder` or `rows`, go to the `<textarea>`.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description: "Changes height depending on its content.",
      group: "Auto-fit",
      prop: "autoFit",
    },
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      class: ".ui-filled",
      default: "false",
      description: "The variant to use.",
      group: "Variants",
      prop: "filled",
    },
    {
      description: "The id of the `<textarea>`.",
      frameworks: ["astro", "vue"],
      prop: "id",
      type: "string",
    },
    {
      class: ".ui-small",
      default: "false",
      description: "The size of the element.",
      group: "Sizes",
      prop: "small",
    },
    {
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the label and description to one side and the textarea to the other.",
      group: "Layout",
      prop: "spread",
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
      legacy: { slots: ["supporting-text"] },
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
