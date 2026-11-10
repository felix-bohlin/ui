import { passThrough } from "../frameworks.ts"
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
    ...passThrough("input", "label", ["autocomplete", "placeholder"], {
      react: "Use `value` with `onChange`, or `defaultValue`.",
    }),
    html: 'Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.',
  },
  options: [
    {
      attribute: '[autocapitalize="characters"]',
      default: "false",
      description:
        "Accepts letters and digits. Letters show uppercase and keep the case they were typed in.",
      group: "Alphanumeric",
      htmlDescription:
        "Shows letters uppercase. Pair it with a `pattern` such as `[A-Za-z0-9]{6}` and no `inputmode`.",
      part: "input",
      prop: "alphanumeric",
    },
    {
      description:
        "The `autocapitalize` of the `<input>`. With `alphanumeric` it is `characters`.",
      inherited: true,
      prop: "autocapitalize",
      type: "string",
    },
    {
      default: '"one-time-code"',
      description:
        "The `autocomplete` of the `<input>`. `one-time-code` lets the browser fill in a code it received.",
      inherited: true,
      prop: "autocomplete",
      type: "string",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Dims the field and blocks input.",
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
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
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "The `inputmode` of the `<input>`. Without `alphanumeric` it is `numeric`.",
      inherited: true,
      prop: "inputmode",
      type: "string",
    },
    {
      attribute: "[maxlength]",
      default: "6",
      description: "The number of characters and boxes, from 4 to 8.",
      group: "Length",
      htmlDescription:
        "The number of characters and boxes, from 4 to 8. Match the `pattern` to it.",
      part: "input",
      prop: "length",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      description:
        "The `pattern` of the `<input>`. It is `[0-9]{length}`, or `[A-Za-z0-9]{length}` with `alphanumeric`.",
      inherited: true,
      prop: "pattern",
      type: "string",
    },
    {
      attribute: "[required]",
      description:
        "Adds a required mark after the label. The form won't submit while the code is incomplete.",
      group: "Required",
      inherited: true,
      part: "input",
      prop: "required",
      type: "boolean",
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
      description:
        "The `spellcheck` of the `<input>`. With `alphanumeric` it is `false`.",
      inherited: true,
      prop: "spellcheck",
      type: "boolean",
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
