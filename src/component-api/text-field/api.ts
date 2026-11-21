import type { ComponentApi } from "../types"

export default {
  component: "TextField",
  elements: [
    {
      members: [
        {
          description:
            "The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.",
          kind: "property",
          name: "control",
        },
      ],
      tag: "opui-character-count",
    },
    {
      members: [
        {
          description:
            "Hides the password: sets the input's `type` back to `password` and the toggle's `aria-pressed` to `false`. The element calls it when the form resets or submits.",
          kind: "method",
          name: "hidePassword()",
        },
        {
          description: "The `<input>` inside, or `null`. Read-only.",
          kind: "property",
          name: "input",
        },
        {
          description:
            "Shows the password: sets the input's `type` to `text` and the toggle's `aria-pressed` to `true`.",
          kind: "method",
          name: "showPassword()",
        },
      ],
      tag: "opui-text-field",
    },
  ],
  keyboard: [
    {
      description:
        "In the field, submits the form it's in, when the form has a submit button or only one field that blocks implicit submission. On a file input, opens the file picker. On the password toggle, shows or hides the password.",
      keys: ["Enter"],
    },
    {
      description:
        "On a file input, opens the file picker. On the password toggle, shows or hides the password.",
      keys: ["Space"],
    },
    {
      description: 'Clears a `type="search"` field in Chromium.',
      keys: ["Esc"],
    },
  ],
  notes: {
    default:
      "Write the `<input>` inside, with its `id` set to `for`, and bind it like any input. Other attributes go to the `.ui-field` root.",
    react:
      "Write the `<input>` inside, with its `id` set to `htmlFor`, and give it `value` with `onChange`, or `defaultValue`. Other attributes go to the `.ui-field` root.",
    html: 'The same `.ui-field` root holds a `<select>` or a `<textarea>`. Put a `<datalist>` next to the input in `.ui-field-container`. For a character count, add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`. For a password toggle, use `<opui-text-field class="ui-field">` with a `<label class="ui-label" for>`, put a `.ui-button` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"` in `.ui-end`, and import `opui-css/elements/text-field.js`. With a label, put a `<label class="ui-label" for>` inside the root that points at the field\'s `id`, so the label alone names it, and point its `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text`, in that order, so a unit, a hint or an error is read after the name. Put `.ui-top` and `.ui-start` before the `<input>` and `.ui-end` and `.ui-bottom` after it, so Tab and screen readers reach them in the order they\'re drawn.',
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
      default: "false",
      description:
        "Shows the characters typed out of `maxlength` in the end text, and announces how many are left once 10% or 10 are left, whichever is more. The component loads `opui-css/elements/character-count.js`, which keeps the count.",
      group: "Character count",
      prop: "characterCount",
    },
    {
      default: '"Characters left: {count}"',
      description:
        "The announcement near the limit, with `{count}` for the characters left. Pass it translated.",
      prop: "characterCountLabel",
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
        'The `id` of your `<input>`. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`. Point the input\'s `aria-describedby` at the ones it shows, in that order.',
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
        'The `id` of your `<input>`, as `htmlFor` like on the element. The label points at it, and each part the field shows gets an id that starts with it: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`. Point the input\'s `aria-describedby` at the ones it shows, in that order.',
      frameworks: ["react"],
      prop: "htmlFor",
      type: "string",
    },
    {
      default: "false",
      description:
        "Adds a button to the end of a `type=\"password\"` field that shows and hides the password. The root becomes `<opui-text-field>`, and the button stays out of the input's description, unless there's also an `end` slot, whose part it shares. The component loads `opui-css/elements/text-field.js`, which runs the button.",
      group: "Password toggle",
      prop: "passwordToggle",
    },
    {
      default: '"Show password"',
      description:
        "The accessible name of the password toggle. The types take it only with `passwordToggle`.",
      prop: "passwordToggleLabel",
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
        "Content above the input, inside the border, with a divider.",
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
      code: "<input>",
      description:
        'Your input, written directly inside `.ui-field-container` with its `id` set to `for`. Bind it, name it and mark it `required`, `disabled` or `aria-invalid="true"` like any input.',
      selector: ".ui-field-container > input",
    },
    {
      description:
        "Content at the inline-end of the field, inside the border, and the password toggle.",
      selector: ".ui-field-container > .ui-end",
      slots: ["end"],
    },
    {
      description:
        'The password toggle, with `aria-pressed` and `command="--toggle-password"`. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Disabled while the input is, and `aria-disabled` while the input is. `<opui-text-field>` keeps it in step, also when a script changes the input, and hides the password when the input is disabled. Hidden until `<opui-text-field>` is defined.',
      props: ["passwordToggle", "passwordToggleLabel"],
      selector: ".ui-field-container > .ui-end > .ui-button",
      slots: ["icon-checked", "icon-unchecked"],
    },
    {
      description:
        "Content below the input, inside the border, with a divider.",
      selector: ".ui-field-container > .ui-bottom",
      slots: ["bottom"],
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
    {
      code: "<opui-character-count>",
      description:
        "The character count, `aria-hidden` so it stays out of the field's description. Near the limit, a live region outside the label announces the characters left.",
      props: ["characterCount", "characterCountLabel"],
      selector: ".ui-end-text > .ui-value",
    },
  ],
  root: {
    description:
      "Container element: a `<div>`, or the `<opui-text-field>` custom element with a password toggle. The label inside is a `<label for>` that names the input by itself.",
    selector: ".ui-field",
  },
  slots: [
    {
      description:
        "Your `<input>`, and a `<datalist>` for it when it has suggestions. Both go in `.ui-field-container`.",
      name: "default",
    },
  ],
  source: "TextField",
} satisfies ComponentApi
