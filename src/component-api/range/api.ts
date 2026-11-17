import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Range",
  hydration: {
    default: [
      {
        description:
          "The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works.",
        fallback: "Import `opui-css/css/js/range.js` in the page.",
        prop: "valueSuffix",
      },
    ],
    react: [
      {
        description:
          "The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works.",
        fallback: "Import `opui-css/css/js/range.js` in the page.",
        prop: "valueSuffix",
      },
      {
        description:
          "The `valueText` content is yours, so it follows the thumb when your own state changes, which takes hydration.",
        fallback:
          "Update the content on `input` yourself, or use `valueSuffix`.",
        prop: "valueText",
      },
    ],
    svelte: [
      {
        description:
          "The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works.",
        fallback: "Import `opui-css/css/js/range.js` in the page.",
        prop: "valueSuffix",
      },
      {
        description:
          "The `valueText` content is yours, so it follows the thumb when your own state changes, which takes hydration.",
        fallback:
          "Update the content on `input` yourself, or use `valueSuffix`.",
        prop: "valueText",
      },
    ],
  },
  keyboard: [
    {
      description:
        "Increases the value by one step. In right-to-left text, Right Arrow decreases it.",
      keys: ["Up Arrow", "Right Arrow"],
    },
    {
      description:
        "Decreases the value by one step. In right-to-left text, Left Arrow increases it.",
      keys: ["Down Arrow", "Left Arrow"],
    },
    {
      description: "Sets the value to the minimum or the maximum.",
      keys: ["Home", "End"],
    },
    {
      description:
        "Increases or decreases the value by a larger step: 10% of the range in Chromium, and at least one step.",
      keys: ["Page Up", "Page Down"],
    },
  ],
  model: {
    description: "The current value.",
    prop: "value",
    type: "number | string",
  },
  notes: {
    ...passThrough("input", "label", ["autofocus", "form"], {
      react:
        "Set `defaultValue` for the starting value. `value` makes it controlled, so update it in `onChange`.",
    }),
    html: 'Add a `<datalist aria-hidden="true">` after the input for tick marks. `data-suffix` on the `.ui-value` output adds text after the value, which `range.js` formats for the closest `lang`.',
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
        'The id of the `<input>`. Generated when omitted and the value is shown. The ids the component generates start with it: `x-label`, `x-start-text`, `x-end-text` and `x-list` for `id="x"`.',
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "Tick marks, rendered as `<option>` elements in a `<datalist>`. Each is a value, or a `{ label, value }` object for a labeled tick. Without `valueSuffix`, the label of the tick at the value is the input's `aria-valuetext`.",
      prop: "items",
    },
    {
      description:
        "The language of the `<label>`, which formats the shown value with `Intl.NumberFormat`. Without it, the value is formatted in English until `opui-css/css/js/range.js` formats it for the closest `lang` in the page.",
      inherited: true,
      prop: "lang",
      type: "string",
    },
    {
      description:
        "The id of the `<datalist>`. Generated when `items` or the `datalist` slot is used.",
      prop: "list",
    },
    {
      default: "100",
      description: "The largest value of the `<input>`.",
      inherited: true,
      prop: "max",
      type: "number | string",
    },
    {
      default: "0",
      description: "The smallest value of the `<input>`.",
      inherited: true,
      prop: "min",
      type: "number | string",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted.",
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
      default: "1",
      description:
        "The step between values of the `<input>`. Without a `value`, the slider starts at the step nearest the middle.",
      inherited: true,
      prop: "step",
      type: "number | string",
    },
    {
      description: "The current value.",
      prop: "value",
    },
    {
      description:
        "Text after the shown value, such as `%`. Setting it shows the current value in an `<output>` and as the input's `aria-valuetext`, formatted for `lang` with the decimals of `min` and `step` and no grouping.",
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
      code: '<output class="ui-value" data-live>',
      description:
        "Shows the current value, with an optional `valueSuffix`. `opui-css/css/js/range.js` keeps it in step with the thumb, and content in the `value-text` slot replaces it.",
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
