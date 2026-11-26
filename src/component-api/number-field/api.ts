import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const imported =
  "The step buttons work as soon as the component's code loads, which imports `opui-css/elements/number-field.js`."

export default {
  component: "NumberField",
  css: ["button", "number-field", "text-field"],
  keyboard: [
    {
      description:
        "Moves focus between the decrease button, the input and the increase button.",
      keys: ["Tab"],
    },
    {
      description:
        "On a step button, steps the value down or up by `step`, and stops at `min` and `max`. Held down, it repeats.",
      keys: ["Enter", "Space"],
    },
    {
      description: "In the input, steps the value up or down by `step`.",
      keys: ["Up Arrow", "Down Arrow"],
    },
  ],
  model: {
    description: "The input value.",
    prop: "value",
    type: "number | string",
  },
  notes: {
    ...passThrough(
      "input",
      "opui-number-field",
      ["min", "max", "step", "placeholder"],
      {
        astro:
          "The component loads `opui-css/elements/number-field.js`, which steps the value when a button is pressed or held.",
        react:
          "Use `value` with `onChange`, or `defaultValue`. The step buttons work once the component mounts and loads `opui-css/elements/number-field.js`, or as soon as the page imports it.",
        svelte: imported,
        vue: imported,
      },
    ),
    html: 'Put the decrease and increase buttons in `.ui-start` and `.ui-end`, with `commandfor` and `aria-controls` naming the input and `command="--step-down"` or `command="--step-up"`, give the `<label>` a `for`, and import `opui-css/elements/number-field.js`. Without it, the buttons are hidden and the input keeps the browser\'s own spin buttons.',
  },
  options: [
    {
      default: '"Decrease"',
      description: "The accessible name of the decrease button.",
      prop: "decreaseLabel",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Dims the field and blocks input and the step buttons.",
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
      part: ".ui-number-field > label",
      prop: "hideLabel",
    },
    {
      description:
        'The id of the `<input>`. The label and the step buttons point at it, so the component generates one when it\'s left out. The start and end text ids start with it: `x-start-text` and `x-end-text` for `id="x"`.',
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      default: '"Increase"',
      description: "The accessible name of the increase button.",
      prop: "increaseLabel",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      attribute: "[required]",
      description:
        "Adds a required mark after the label. The form won't submit while the field is empty.",
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
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the label and start text to one side and the field to the other.",
      group: "Spread",
      prop: "spread",
    },
    {
      class: ".ui-stretch",
      default: "false",
      description:
        "Fills the available width. Without it, the field fits its value, from `--_min-inline-size` (`4ch`).",
      group: "Stretch",
      prop: "stretch",
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
      description: "Start text displayed above the field.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      description: "The boxed input area.",
      selector: ".ui-field",
    },
    {
      description:
        'The decrease button, with `command="--step-down"`. Renders a minus icon by default, or the `svg` in `decrease-icon`. Hidden until the element is defined.',
      props: ["decreaseLabel"],
      selector: ".ui-field > .ui-start",
      slots: ["decrease-icon"],
    },
    {
      code: '<input type="number">',
      description: "The input element.",
      model: true,
      selector: "input",
    },
    {
      description:
        'The increase button, with `command="--step-up"`. Renders a plus icon by default, or the `svg` in `increase-icon`. Hidden until the element is defined.',
      props: ["increaseLabel"],
      selector: ".ui-field > .ui-end",
      slots: ["increase-icon"],
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description:
      "The `<opui-number-field>` custom element. It steps the value and marks a button `aria-disabled` at `min` or `max`.",
    selector: "opui-number-field.ui-number-field",
  },
  source: "NumberField",
} satisfies ComponentApi
