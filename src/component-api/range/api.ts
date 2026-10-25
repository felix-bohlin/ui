import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Range",
  hydration: {
    default: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback:
          "Update the `<output>` text on `input` yourself, or add `data-live` to it and call `initRange()` from `opui-css/css/js/range.js`.",
        prop: "valueSuffix",
      },
    ],
    react: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback:
          "Update the `<output>` text on `input` yourself, or add `data-live` to it and call `initRange()` from `opui-css/css/js/range.js`.",
        prop: "valueSuffix",
      },
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback:
          "Update the `<output>` text on `input` yourself, or add `data-live` to it and call `initRange()` from `opui-css/css/js/range.js`.",
        prop: "valueText",
      },
    ],
    svelte: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback:
          "Update the `<output>` text on `input` yourself, or add `data-live` to it and call `initRange()` from `opui-css/css/js/range.js`.",
        prop: "valueSuffix",
      },
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback:
          "Update the `<output>` text on `input` yourself, or add `data-live` to it and call `initRange()` from `opui-css/css/js/range.js`.",
        prop: "valueText",
      },
    ],
  },
  model: {
    description: "The current value.",
    prop: "value",
    type: "number | string",
  },
  notes: {
    ...passThrough("input", "label", ["max", "min", "step"], {
      react:
        "Set `defaultValue` for the starting value. `value` makes it controlled, so update it in `onChange`.",
    }),
    html: 'Add a `<datalist aria-hidden="true">` after the input for tick marks.',
  },
  options: [
    {
      attribute: "[disabled]",
      default: "false",
      description: "Dims the slider and blocks input.",
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
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.",
      group: "Label",
      part: ".ui-range > span",
      prop: "hideLabel",
    },
    {
      description:
        "The id of the `<input>`. Generated when omitted and the value is shown.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "Tick marks, rendered as `<option>` elements in a `<datalist>`. Each is a value, or a `{ label, value }` object for a labeled tick.",
      prop: "items",
    },
    {
      description:
        "The id of the `<datalist>`. Generated when `items` or the `datalist` slot is used.",
      prop: "list",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.",
      inherited: true,
      prop: "name",
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
      default: '"outlined"',
      description:
        "The variant to use. The default `outlined` track uses `--ui-track-bg-color`, or the field border color when the theme doesn't set it.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        outlined: null,
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      description: "The label for the range.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["label"],
    },
    {
      code: "<output>",
      description: "Shows the current value, with an optional `valueSuffix`.",
      props: ["valueSuffix"],
      selector: "output.ui-value",
      slots: ["value-text"],
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
      code: "<datalist>",
      description: "Tick marks and their labels, under the input.",
      props: ["items", "list"],
      selector: "datalist",
      slots: ["datalist"],
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
  source: "Range",
} satisfies ComponentApi
