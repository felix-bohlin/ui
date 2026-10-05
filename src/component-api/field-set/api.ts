import type { ComponentApi } from "../types"

export default {
  component: "FieldSet",
  css: ["form"],
  options: [
    {
      default: '"fieldset"',
      description:
        'The element to render. Any element other than `fieldset` gets `role="group"`, and needs `aria-labelledby` pointing at its legend.',
      prop: "as",
    },
    {
      attribute: "[data-invalid]",
      description: "Shows error styles on the fields inside.",
      frameworks: ["html"],
      group: "Validation",
      prop: "data-invalid",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables every field inside.",
      frameworks: ["astro", "html", "svelte", "vue"],
      group: "State",
      prop: "disabled",
      type: "boolean",
    },
  ],
  page: "form",
  parts: [
    {
      code: "<legend>",
      component: {
        astro: "FieldLegend",
        svelte: "FieldLegend",
        vue: "FieldLegend",
      },
      description: "The label of the fieldset.",
      selector: ":is(legend, .ui-legend)",
    },
    {
      component: {
        astro: "FieldDescription",
        svelte: "FieldDescription",
        vue: "FieldDescription",
      },
      description: "Supporting text displayed below the legend.",
      selector: ".ui-field-description",
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
  source: "FieldSet",
} satisfies ComponentApi
