import type { ComponentApi } from "../types"

export default {
  component: "OneTimeCode",
  css: ["one-time-code", "text-field"],
  model: {
    description: "The code.",
    prop: "value",
    type: "string",
  },
  notes: {
    astro:
      "Input attributes, such as `disabled`, `name`, `pattern`, `required` and `value`, go to the `<input>`. Other attributes go to the root `<label>`.",
    html: 'Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.',
    svelte:
      "Attributes that aren't props, such as `disabled`, `name`, `pattern` or `required`, go to the `<input>`.",
    vue: "Attributes that aren't props, such as `disabled`, `name`, `pattern` or `required`, go to the `<input>`.",
  },
  options: [
    {
      attribute: '[autocapitalize="characters"]',
      default: "false",
      description:
        "Accepts letters and digits. Letters show uppercase and keep the case they were typed in.",
      group: "Characters",
      htmlDescription:
        "Shows letters uppercase. Pair it with a `pattern` such as `[A-Za-z0-9]{6}` and no `inputmode`.",
      part: "input",
      prop: "alphanumeric",
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
      class: ".ui-grouped",
      default: "false",
      description: "Draws a dash between the two halves of the code.",
      group: "Grouped",
      prop: "grouped",
    },
    {
      description: "The id of the `<input>`.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "id",
      type: "string",
    },
    {
      attribute: "[maxlength]",
      default: "6",
      description: "The number of characters and boxes.",
      group: "Length",
      htmlDescription:
        "The number of characters and boxes, from 4 to 8. Match the `pattern` to it.",
      part: "input",
      prop: "length",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        small: ".ui-small",
      },
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
      description: "Draws a box per character and a ring on the next one.",
      selector: ".ui-field",
    },
    {
      code: "<input>",
      description: "The input element.",
      model: true,
      selector: "input",
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
    selector: "label.ui-text-field.ui-one-time-code",
  },
  source: "OneTimeCode",
} satisfies ComponentApi
