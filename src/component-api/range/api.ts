import type { ComponentApi } from "../types"

export default {
  component: "Range",
  model: {
    description: "The current value.",
    prop: "value",
    type: "number | string",
  },
  notes: {
    astro:
      "Input attributes, such as `disabled`, `max`, `min`, `name` and `step`, go to the `<input>`.",
    html: "Add a `<datalist>` after the input for tick marks.",
    svelte:
      "Attributes that aren't props, such as `max`, `min` or `step`, go to the `<input>`.",
    vue: "Attributes that aren't props, such as `max`, `min` or `step`, go to the `<input>`.",
  },
  options: [
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      description:
        "The id of the `<input>`. Generated when omitted and the value is shown.",
      prop: "id",
    },
    {
      description: "The id of the `<datalist>`. Needed with `options`.",
      prop: "list",
    },
    {
      description:
        "Tick marks, rendered as `<option>` elements in a `<datalist>`.",
      prop: "options",
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
      description: "The current value.",
      prop: "value",
      type: "number | string",
    },
    {
      description:
        "Text after the shown value, such as `%`. Setting it shows the current value in an `<output>`.",
      prop: "valueSuffix",
    },
    {
      description:
        "The track surface. Without one, the track uses the field border color.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      description: "The label for the range.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["default"],
    },
    {
      code: "<output>",
      description: "Shows the current value, with an optional `valueSuffix`.",
      props: ["valueSuffix"],
      selector: "output.ui-value",
      slots: ["value"],
      snippets: ["valueText"],
    },
    {
      description: "Description text displayed above the input.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      code: "<input>",
      description: "The range input.",
      model: true,
      selector: 'input[type="range"]',
    },
    {
      description: "Supporting text displayed below the input.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-range",
  },
  slots: [
    {
      description: "Extra `<option>` elements for the `<datalist>`.",
      name: "datalist",
    },
  ],
  source: "Range",
} satisfies ComponentApi
