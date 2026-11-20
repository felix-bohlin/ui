import type { ComponentApi } from "../types"

export default {
  component: "OneTimeCode",
  css: ["one-time-code", "text-field"],
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
        "The `id` of your `<input>`. The label points at it, and the end text's id, `x-end-text`, starts with it, for the input's `aria-describedby`.",
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      class: ".ui-grouped",
      default: "false",
      description:
        "Draws a dash between the two halves of the code. Use it with an even `maxlength`.",
      group: "Grouped",
      prop: "grouped",
    },
    {
      description:
        "The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and the end text's id, `x-end-text`, starts with it, for the input's `aria-describedby`.",
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
      selector: ".ui-field",
    },
    {
      code: "<input>",
      description:
        'Your input, written directly inside `.ui-field` with its `id` set to `for`. Its `maxlength`, from 4 to 8, sets the number of boxes. `autocomplete="one-time-code"` lets the browser fill in a code it received; use `off` for a code read off another screen. Mark it `required`, `disabled` or `aria-invalid="true"` like any input.',
      selector: ".ui-field > input",
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
    selector: "div.ui-one-time-code",
  },
  slots: [
    {
      description: "Your `<input>`, which goes in `.ui-field`.",
      name: "default",
    },
  ],
  source: "OneTimeCode",
} satisfies ComponentApi
