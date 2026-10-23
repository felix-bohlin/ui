import type { ComponentApi } from "../types"

export default {
  component: "Fieldset",
  css: ["form"],
  options: [
    {
      default: '"fieldset"',
      description:
        'The element to render. Elements other than `fieldset` get `role="group"`. Point their `aria-labelledby` at the legend.',
      prop: "as",
    },
    {
      default: "false",
      description: "Disables every field inside. Only on a `<fieldset>`.",
      inherited: true,
      prop: "disabled",
      type: "boolean",
    },
    {
      description:
        '`disabled` disables every field inside, only on a `<fieldset>`. A field inside with `aria-invalid="true"`, or that is `:user-invalid`, colors the end text, and a required field adds a required mark after the legend.',
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: {
        disabled: "[disabled]",
        invalid: ':has([aria-invalid="true"], :user-invalid)',
        required: ":has(:required)",
      },
    },
  ],
  page: "form",
  parts: [
    {
      code: "<legend>",
      component: "FieldLegend",
      description: "The label of the fieldset.",
      selector: ":is(legend, .ui-legend)",
    },
    {
      component: "FieldDescription",
      description: "Supporting text displayed below the legend.",
      selector: ".ui-fieldset > .ui-description",
    },
    {
      description:
        "Supporting or error text for the whole group, after the fields.",
      selector: ".ui-fieldset > .ui-end-text",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-fieldset",
  },
  slots: [
    {
      description: "The legend, description and fields.",
      name: "default",
    },
  ],
  source: "Fieldset",
} satisfies ComponentApi
