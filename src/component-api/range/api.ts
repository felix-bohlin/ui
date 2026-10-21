import type { ComponentApi } from "../types"

export default {
  component: "Range",
  hydration: {
    default: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback: "Update the `<output>` text on `input` yourself.",
        prop: "valueSuffix",
      },
    ],
    react: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback: "Update the `<output>` text on `input` yourself.",
        prop: "valueSuffix",
      },
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback: "Update the `<output>` text on `input` yourself.",
        prop: "valueText",
      },
    ],
    svelte: [
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback: "Update the `<output>` text on `input` yourself.",
        prop: "valueSuffix",
      },
      {
        description:
          "The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works.",
        fallback: "Update the `<output>` text on `input` yourself.",
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
    astro:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `max`, `min`, `name` and `step`, and `class` and `style` go to the root `<label>`.",
    html: 'Add a `<datalist aria-hidden="true">` after the input for tick marks.',
    react:
      "Attributes that aren't props go to the `<input>`, like `max`, `min` or `step`, and `className` and `style` go to the root `<label>`. Set `defaultValue` for the starting value. `value` makes it controlled, so update it in `onChange`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `max`, `min` or `step`, and `class` and `style` go to the root `<label>`.",
    vue: "Attributes that aren't props go to the `<input>`, like `max`, `min` or `step`, and `class` and `style` go to the root `<label>`.",
  },
  options: [
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "input",
      prop: "error",
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
        "The id of the `<datalist>`. Generated when `options` or the `datalist` slot is used.",
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
      description:
        "The variant to use. Without one, the track uses `--ui-track-color`, or the field border color when the theme doesn't set it.",
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
      code: "<datalist>",
      description: "Tick marks and their labels, under the input.",
      props: ["list", "options"],
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
