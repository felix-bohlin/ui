import type { ComponentApi } from "../types"

export default {
  component: "StepButton",
  css: ["button", "step-button", "text-field"],
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
            "Steps the value down or up by `step`, as its button's `command` says, unless the input is disabled, read-only or at `min` or `max`, and fires `input` and `change`.",
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
      description:
        "On a step button, steps the value down or up by `step`, and stops at `min` and `max`. Held down, it repeats.",
      keys: ["Enter", "Space"],
    },
    {
      description: "In the input, steps the value up or down by `step`.",
      keys: ["Up Arrow", "Down Arrow"],
    },
  ],
  notes: {
    default:
      'Put one with `command="--step-down"` in the field\'s `start` and one with `command="--step-up"` in its `end`, next to an `<input type="number">`, and leave those parts out of the input\'s `aria-describedby`. It loads `opui-css/elements/step-button.js`, which steps the value when the button is pressed or held.',
    html: 'Put `<opui-step-button>` in `.ui-start` and `.ui-end`, around a `.ui-button.ui-round` with `commandfor` and `aria-controls` naming the input and `command="--step-down"` or `command="--step-up"`, and import `opui-css/elements/step-button.js`. Without it, the buttons are hidden and the input keeps the browser\'s own spin buttons.',
  },
  options: [
    {
      description:
        "Which way the button steps the input: `--step-down` or `--step-up`, as on the element.",
      prop: "command",
      type: '"--step-down" | "--step-up"',
    },
    {
      description:
        "The `id` of the number input the button steps, as its button's `commandfor` and `aria-controls`.",
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      description:
        "The `id` of the number input the button steps, as `htmlFor` like on a label, and its button's `commandfor` and `aria-controls`.",
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
      'A `.ui-button.ui-round` with `command="--step-down"` or `command="--step-up"`. Renders a minus or a plus icon by default, or the icon in its default slot. Disabled while the input is, and `aria-disabled` at `min` or `max`, while the input is read-only and while it is `aria-disabled`. `<opui-step-button>` keeps it in step, also when a script changes the input. Hidden until `<opui-step-button>` is defined.',
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
