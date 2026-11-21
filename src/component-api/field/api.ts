import type { ComponentApi } from "../types"

export default {
  component: "Field",
  css: ["list", "select", "text-field", "textarea"],
  keyboard: [
    {
      description:
        "With a select's list open, closes it without changing the value. In a textarea, moves focus to the next element, like in any field, instead of typing a tab character.",
      keys: ["Tab"],
    },
    {
      description:
        "In an input, submits the form it's in, when the form has a submit button or only one field that blocks implicit submission. In a textarea, starts a new line. On a file input, opens the file picker. On a select, opens the list, and in the list picks the focused option, closes the list and returns focus to the select. On the password toggle, shows or hides the password.",
      keys: ["Enter"],
    },
    {
      description:
        "On a file input, opens the file picker. On a select, opens the list, and in the list picks the focused option, closes the list and returns focus to the select. On the password toggle, shows or hides the password.",
      keys: ["Space"],
    },
    {
      description:
        "On a select, opens the list. In the list, moves to the previous or next option.",
      keys: ["Up Arrow", "Down Arrow"],
    },
    {
      description: "In a select's list, moves to the first or last option.",
      keys: ["Home", "End"],
    },
    {
      description:
        'Closes a select\'s list without changing the value, and focus returns to the select. Clears a `type="search"` field in Chromium.',
      keys: ["Esc"],
    },
    {
      description:
        "On a select, moves to the first option that starts with the typed text. On a closed select, this picks the option.",
      keys: ["Printable characters"],
    },
  ],
  notes: {
    default:
      "Write the `<input>`, `<select>` or `<textarea>` inside, with its `id` set to `for`, and bind it like any control. Other attributes go to the `.ui-field` root.",
    react:
      "Write the `<input>`, `<select>` or `<textarea>` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-field` root.",
    html: "Put a `<label class=\"ui-label\" for>` inside the root that points at the control's `id`, so the label alone names it, and point the control's `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text`, in that order, so a unit, a hint or an error is read after the name. Leave out a `.ui-start` or `.ui-end` that only holds buttons. Put `.ui-top` and `.ui-start` before the control and `.ui-end` and `.ui-bottom` after it, so Tab and screen readers reach them in the order they're drawn.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description: "Lets the width follow the content, from `25ch`.",
      group: "Auto fit",
      prop: "autoFit",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the options of a select tighter.",
      group: "Dense",
      prop: "dense",
    },
    {
      class: ".ui-drop-zone",
      default: "false",
      description:
        'Makes a `type="file"` field a tall drop zone with a dashed border. The whole input takes files dropped on it, and a click opens the file picker.',
      group: "Drop zone",
      prop: "dropZone",
    },
    {
      description:
        'The `id` of your control. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`. Point the control\'s `aria-describedby` at the ones it shows, in that order.',
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
      part: ".ui-field > label",
      prop: "hideLabel",
    },
    {
      description:
        'The `id` of your control, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`. Point the control\'s `aria-describedby` at the ones it shows, in that order.',
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
    {
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the label and start text to one side and the control to the other.",
      group: "Spread",
      prop: "spread",
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
      description: "The boxed control area.",
      selector: ".ui-field-container",
    },
    {
      description:
        "Content above the control, inside the border, with a divider.",
      selector: ".ui-field-container > .ui-top",
      slots: ["top"],
    },
    {
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-field-container > .ui-start",
      slots: ["start"],
    },
    {
      code: "<input>, <select> or <textarea>",
      description:
        'Your control, written directly inside `.ui-field-container` with its `id` set to `for`. Bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any control. A `<textarea>` grows with its content, and a `<select>` is a customizable select.',
      selector: ".ui-field-container > :is(input, select, textarea)",
    },
    {
      description:
        "Content at the inline-end of the field, inside the border, such as a `PasswordToggle`.",
      selector: ".ui-field-container > .ui-end",
      slots: ["end"],
    },
    {
      description:
        "Content below the control, inside the border, with a divider.",
      selector: ".ui-field-container > .ui-bottom",
      slots: ["bottom"],
    },
    {
      description:
        "Supporting text displayed below the field, and a `CharacterCount`.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description:
      "Container element, a `<div>`. The label inside is a `<label for>` that names the control by itself.",
    selector: ".ui-field",
  },
  slots: [
    {
      description:
        "Your `<input>`, `<select>` or `<textarea>`, and a `<datalist>` for an input with suggestions. Both go in `.ui-field-container`.",
      name: "default",
    },
  ],
  source: "Field",
} satisfies ComponentApi
