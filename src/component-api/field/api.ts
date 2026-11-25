import type { ComponentApi } from "../types"

export default {
  component: "Field",
  css: ["field", "list", "select", "textarea"],
  keyboard: [
    {
      description:
        "Closes an open select list without changing the value. In a textarea, moves focus on instead of typing a tab.",
      keys: ["Tab"],
    },
    {
      description:
        "Submits the form from an input, and starts a new line in a textarea. Opens a file picker or a select list, and in the list picks the focused option. Shows or hides the password on the password toggle.",
      keys: ["Enter"],
    },
    {
      description:
        "Opens a file picker or a select list, and in the list picks the focused option. Shows or hides the password on the password toggle.",
      keys: ["Space"],
    },
    {
      description: "Opens a select list, and moves through its options.",
      keys: ["Up Arrow", "Down Arrow"],
    },
    {
      description: "Moves to the first or last option in a select list.",
      keys: ["Home", "End"],
    },
    {
      description:
        'Closes a select list without changing the value. Clears a `type="search"` field in Chromium.',
      keys: ["Esc"],
    },
    {
      description:
        "On a select, moves to the first option that starts with the typed text, and picks it while the list is closed.",
      keys: ["Printable characters"],
    },
  ],
  notes: {
    default:
      "Write your control inside, with its `id` set to `for`. Other attributes go to the `.ui-field` root.",
    react:
      "Write your control inside, with its `id` set to `htmlFor`. Other attributes go to the `.ui-field` root.",
    html: "Point the `<label class=\"ui-label\" for>` at the control's `id`, and the control's `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text` in that order, leaving out parts with nothing to read. Write `.ui-top` and `.ui-start` before the control, and `.ui-end` and `.ui-bottom` after it.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description:
        "Fits the width to the content, from `25ch` (`4ch` with step buttons), and lets a textarea resize sideways.",
      group: "Auto fit",
      prop: "autoFit",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Tighter select options.",
      group: "Dense",
      prop: "dense",
    },
    {
      class: ".ui-drop-zone",
      default: "false",
      description: 'Makes a `type="file"` input a tall, dashed drop zone.',
      group: "Drop zone",
      prop: "dropZone",
    },
    {
      description:
        'The `id` of your control, which the label points at and the part ids start with: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`.',
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description: "Visually hides the label but keeps its name.",
      group: "Label",
      part: ".ui-field > label",
      prop: "hideLabel",
    },
    {
      description:
        'The `id` of your control, which the label points at and the part ids start with: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`.',
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
      description: "Puts the label and start text beside the control.",
      group: "Spread",
      prop: "spread",
    },
    {
      description:
        "Set on the control: invalid shows the error colors, required marks the label, disabled dims the field and read-only keeps the text cursor.",
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: {
        disabled:
          ':has(:is(input, select, textarea):is(:disabled, [aria-disabled="true"]))',
        invalid: ':has([aria-invalid="true"], :user-invalid)',
        readonly: ":has([readonly])",
        required: ":has(:required)",
      },
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
      description: "Text above the box.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      description: "The box around the control.",
      selector: ".ui-field-container",
    },
    {
      description: "Content above the control, inside the box.",
      selector: ".ui-field-container > .ui-top",
      slots: ["top"],
    },
    {
      description: "Content before the control, inside the box.",
      selector: ".ui-field-container > .ui-start",
      slots: ["start"],
    },
    {
      code: "<input>, <select> or <textarea>",
      description: "Your control, with the field's `for` as its `id`.",
      selector: ".ui-field-container > :is(input, select, textarea)",
    },
    {
      description:
        "Content after the control, inside the box, like a `PasswordToggle`.",
      selector: ".ui-field-container > .ui-end",
      slots: ["end"],
    },
    {
      description: "Content below the control, inside the box.",
      selector: ".ui-field-container > .ui-bottom",
      slots: ["bottom"],
    },
    {
      description: "Text below the box, and a `CharacterCount`.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "A `<div>`, whose `<label for>` names the control.",
    selector: ".ui-field",
  },
  slots: [
    {
      description:
        "Your `<input>`, `<select>` or `<textarea>`, and a `<datalist>` for suggestions.",
      name: "default",
    },
  ],
  source: "Field",
} satisfies ComponentApi
