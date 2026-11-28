import type { ComponentApi } from "../types"

export default {
  component: "OneTimeCode",
  css: ["field", "one-time-code"],
  notes: {
    default:
      'Write the `<input>` inside, with its `id` set to `for`, `autocomplete="one-time-code"`, a `maxlength` from 4 to 8, which sets the number of boxes, and a matching `pattern`: `inputmode="numeric"` and `[0-9]{6}` for digits, or `autocapitalize="characters"`, `spellcheck="false"` and `[A-Za-z0-9]{6}` for letters and digits. Bind it like any input. Other attributes go to the `.ui-one-time-code` root.',
    html: 'Use one `<input>` with `autocomplete="one-time-code"`, `maxlength` and a matching `pattern`, such as `[0-9]{6}`, plus `inputmode="numeric"` for digits.',
    react:
      'Write the `<input>` inside, with its `id` set to `htmlFor`, `autoComplete="one-time-code"`, a `maxLength` from 4 to 8, which sets the number of boxes, and a matching `pattern`: `inputMode="numeric"` and `[0-9]{6}` for digits, or `autoCapitalize="characters"`, `spellCheck={false}` and `[A-Za-z0-9]{6}` for letters and digits. Give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-one-time-code` root.',
  },
  options: [
    {
      description:
        'The `id` of your `<input>`. The label points at it, and the end text gets an id that starts with it: `x-end-text` for `for="x"`. Point the input\'s `aria-describedby` at it.',
      frameworks: ["astro", "nunjucks", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      class: ".ui-grouped",
      default: "false",
      description:
        "Draws a dash between the two halves of the code. Use it with an even maximum length.",
      group: "Grouped",
      htmlDescription:
        "Draws a dash between the two halves of the code. Use it with an even `maxlength`.",
      prop: "grouped",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The input keeps it as its accessible name.",
      group: "Label",
      part: ".ui-one-time-code > label",
      prop: "hideLabel",
    },
    {
      description:
        'The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and the end text gets an id that starts with it: `x-end-text` for `htmlFor="x"`. Point the input\'s `aria-describedby` at it.',
      frameworks: ["react"],
      prop: "htmlFor",
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
      selector: ".ui-field-container",
    },
    {
      code: "<input>",
      description:
        "Your input, written directly inside the container with the `id` the field's label names. Its maximum length, from 4 to 8, sets the number of boxes. One-time-code autocomplete lets the browser fill in a code it received; turn it off for a code read off another screen. Mark it required, disabled or invalid like any input.",
      htmlDescription:
        'Your input, written directly inside `.ui-field-container` with its `id` set to the label\'s `for`. Its `maxlength`, from 4 to 8, sets the number of boxes. `autocomplete="one-time-code"` lets the browser fill in a code it received; use `off` for a code read off another screen. Mark it `required`, `disabled` or `aria-invalid="true"` like any input.',
      selector: ".ui-field-container > input",
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
      "Holds the label, the boxes and the end text, and fits the boxes to its width.",
    selector: "div.ui-one-time-code",
  },
  slots: [
    {
      description: "Your `<input>`, which goes in `.ui-field-container`.",
      name: "default",
    },
  ],
  source: "OneTimeCode",
} satisfies ComponentApi
