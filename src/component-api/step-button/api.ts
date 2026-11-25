import type { ComponentApi } from "../types"

export default {
  component: "StepButton",
  css: ["button", "field", "step-button"],
  elements: [
    {
      members: [
        {
          description:
            "The `<input>` its button's `commandfor` names, or `null`. Read-only.",
          kind: "property",
          name: "input",
        },
        {
          description:
            "Steps the value by `step` in the button's direction, within `min` and `max` and unless the input is disabled or read-only, and fires `input` and `change`.",
          kind: "method",
          name: "step()",
        },
      ],
      tag: "opui-step-button",
    },
  ],
  keyboard: [
    {
      description:
        "Moves focus between the decrease button, the input and the increase button.",
      keys: ["Tab"],
    },
    {
      description: "On a step button, steps the value, repeating while held.",
      keys: ["Enter", "Space"],
    },
    {
      description: "In the input, steps the value up or down by `step`.",
      keys: ["Up Arrow", "Down Arrow"],
    },
  ],
  notes: {
    default:
      'Put one with `command="--step-down"` in `start` and one with `command="--step-up"` in `end`, next to an `<input type="number">`. It loads `opui-css/elements/step-button.js`. Attributes that aren\'t props, `class` and `style` go to the `<opui-step-button>`, not the button.',
    react:
      'Put one with `command="--step-down"` in `start` and one with `command="--step-up"` in `end`, next to an `<input type="number">`. It loads `opui-css/elements/step-button.js`. Attributes that aren\'t props, `className` and `style` go to the `<opui-step-button>`, not the button.',
    html: 'Put `<opui-step-button>` in `.ui-start` and `.ui-end`, around a `.ui-button.ui-round` with `command="--step-down"` or `command="--step-up"`, `commandfor` and `aria-controls` naming the input and an `aria-label`, and import `opui-css/elements/step-button.js`. Without it, the input keeps its own spin buttons.',
  },
  options: [
    {
      description: "Which way the button steps: `--step-down` or `--step-up`.",
      prop: "command",
      type: '"--step-down" | "--step-up"',
    },
    {
      description:
        "The `id` of the number input, as its button's `commandfor` and `aria-controls`.",
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      description:
        "The `id` of the number input, as its button's `commandfor` and `aria-controls`.",
      frameworks: ["react"],
      prop: "htmlFor",
      type: "string",
    },
    {
      attribute: "aria-label",
      default: '"Decrease" or "Increase"',
      description:
        "The accessible name of the button, by `command`. Pass it translated.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "number-field",
  parts: [],
  root: {
    code: "<opui-step-button>",
    description:
      'A `.ui-button.ui-round` with `command="--step-down"` or `command="--step-up"`, showing a minus or a plus, or your icon. Disabled with the input, and `aria-disabled` at `min` or `max` or while the input is read-only or `aria-disabled`. Hidden until `<opui-step-button>` is defined.',
    selector: "opui-step-button > .ui-button",
  },
  slots: [
    {
      description: "The icon, an `svg`.",
      name: "default",
    },
  ],
  source: "StepButton",
} satisfies ComponentApi
