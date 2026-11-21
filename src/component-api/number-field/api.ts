import type { ComponentApi } from "../types"

const imported =
  "The step buttons work as soon as the component's code loads, which imports `opui-css/elements/number-field.js`."

export default {
  component: "NumberField",
  css: ["button", "number-field", "text-field"],
  elements: [
    {
      members: [
        {
          description:
            'The `<input type="number">` inside, or `null`. Read-only.',
          kind: "property",
          name: "input",
        },
        {
          description:
            "Steps the value down by `step`, unless the input is disabled, read-only or at `min`, and fires `input` and `change`.",
          kind: "method",
          name: "stepDown()",
        },
        {
          description:
            "Steps the value up by `step`, unless the input is disabled, read-only or at `max`, and fires `input` and `change`.",
          kind: "method",
          name: "stepUp()",
        },
      ],
      tag: "opui-number-field",
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
    astro:
      'Write the `<input type="number">` inside, with its `id` set to `for`. Other attributes go to the root. The component loads `opui-css/elements/number-field.js`, which steps the value when a button is pressed or held.',
    react:
      'Write the `<input type="number">` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the root. The step buttons work once the component mounts and loads `opui-css/elements/number-field.js`, or as soon as the page imports it.',
    solid: `Write the \`<input type="number">\` inside, with its \`id\` set to \`for\`, and bind it like any input. Other attributes go to the root. ${imported}`,
    svelte: `Write the \`<input type="number">\` inside, with its \`id\` set to \`for\`, and bind it like any input. Other attributes go to the root. ${imported}`,
    vue: `Write the \`<input type="number">\` inside, with its \`id\` set to \`for\`, and bind it like any input. Other attributes go to the root. ${imported}`,
    html: 'Put the decrease and increase buttons in `.ui-start` and `.ui-end`, with `commandfor` and `aria-controls` naming the input and `command="--step-down"` or `command="--step-up"`, give the `<label>` a `for`, and import `opui-css/elements/number-field.js`. Without it, the buttons are hidden and the input keeps the browser\'s own spin buttons.',
  },
  options: [
    {
      default: '"Decrease"',
      description: "The accessible name of the decrease button.",
      prop: "decreaseLabel",
    },
    {
      description:
        'The `id` of your `<input>`. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text` and `x-end-text` for `for="x"`. Point the input\'s `aria-describedby` at the ones it shows, in that order.',
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
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
        'The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text` and `x-end-text` for `htmlFor="x"`. Point the input\'s `aria-describedby` at the ones it shows, in that order.',
      frameworks: ["react"],
      prop: "htmlFor",
      type: "string",
    },
    {
      default: '"Increase"',
      description: "The accessible name of the increase button.",
      prop: "increaseLabel",
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
      selector: ".ui-field-container",
    },
    {
      description:
        'The decrease button, with `command="--step-down"`. Renders a minus icon by default, or the `svg` in `decrease-icon`. Hidden until the element is defined.',
      props: ["decreaseLabel"],
      selector: ".ui-field-container > .ui-start",
      slots: ["decrease-icon"],
    },
    {
      code: '<input type="number">',
      description:
        'Your `<input type="number">`, written directly inside `.ui-field-container` between the buttons, with its `id` set to `for`. Give it `min`, `max` and `step`, and bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any input.',
      selector: ".ui-field-container > input",
    },
    {
      description:
        'The increase button, with `command="--step-up"`. Renders a plus icon by default, or the `svg` in `increase-icon`. Hidden until the element is defined.',
      props: ["increaseLabel"],
      selector: ".ui-field-container > .ui-end",
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
      "The `<opui-number-field>` custom element. It steps the value, marks a button `aria-disabled` at `min` or `max`, and keeps both disabled while the input is disabled and `aria-disabled` while the input is, also when a script changes the input.",
    selector: "opui-number-field.ui-number-field",
  },
  slots: [
    {
      description:
        'Your `<input type="number">`, which goes in `.ui-field-container` between the buttons.',
      name: "default",
    },
  ],
  source: "NumberField",
} satisfies ComponentApi
