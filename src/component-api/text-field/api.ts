import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "TextField",
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
  model: {
    description: "The input value.",
    prop: "value",
    type: "string | number",
  },
  notes: {
    ...passThrough("input", "label", ["autocomplete", "placeholder"], {
      react: "Use `value` with `onChange`, or `defaultValue`.",
    }),
    html: "Use `.ui-select` for a `<select>` and `.ui-textarea` for a `<textarea>`. You can put a `<datalist>` inside the root.",
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
      htmlDescription:
        'Add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, and import `opui-css/elements/character-count.js`.',
      prop: "characterCount",
    },
    {
      default: '"Characters left: {count}"',
      description:
        "The announcement near the limit, with `{count}` for the characters left. Pass it translated.",
      htmlDescription:
        "Set the announcement as the `label` attribute of `<opui-character-count>`, with `{count}` for the characters left.",
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
      default: "false",
      description:
        'Dims the field and blocks input. `aria-disabled="true"` looks the same, but keeps the field focusable, its text editable and its value in the form.',
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
      values: {
        "aria-disabled": '[aria-disabled="true"]',
        disabled: "[disabled]",
      },
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
      part: ".ui-text-field > :is(span, label)",
      prop: "hideLabel",
    },
    {
      description:
        'The id of the `<input>`. With `passwordToggle`, the label and the toggle point at it, so the component generates one when it\'s left out, and the start and end text ids start with it: `x-start-text` and `x-end-text` for `id="x"`.',
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        'The `inputmode` of the `<input>`. With `type="numeric"` it is `numeric`.',
      inherited: true,
      prop: "inputmode",
      type: "string",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      default: "false",
      description:
        'Adds a button to the end of a `type="password"` field that shows and hides the password. The root becomes `<opui-text-field>` with a `<label for>`, since a button inside a `<label>` would join the field\'s name, and the start and end text describe the input. The component loads `opui-css/elements/text-field.js`, which runs the button.',
      group: "Password toggle",
      htmlDescription:
        'Use `<opui-text-field class="ui-text-field">` with a `<label class="ui-label" for>`, put a `.ui-button` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"` in `.ui-end`, and import `opui-css/elements/text-field.js`.',
      prop: "passwordToggle",
    },
    {
      default: '"Show password"',
      description: "The accessible name of the password toggle.",
      prop: "passwordToggleLabel",
    },
    {
      description:
        'The `pattern` of the `<input>`. With `type="numeric"` it is `[0-9]*`.',
      inherited: true,
      prop: "pattern",
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
        "Pushes the label and start text to one side and the input to the other.",
      group: "Spread",
      prop: "spread",
    },
    {
      default: '"text"',
      description:
        'The input type. `"numeric"` renders a text input with a numeric keyboard.',
      prop: "type",
      type: '"numeric" | string',
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
        "Content above the input, inside the border, with a divider.",
      selector: ".ui-field > .ui-top",
      slots: ["top"],
    },
    {
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-field > .ui-start",
      slots: ["start"],
    },
    {
      code: "<input>",
      description: "The input element.",
      model: true,
      selector: "input",
    },
    {
      description:
        "Content at the inline-end of the field, inside the border, and the password toggle.",
      selector: ".ui-field > .ui-end",
      slots: ["end"],
    },
    {
      description:
        'The password toggle, with `aria-pressed` and `command="--toggle-password"`. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Hidden until `<opui-text-field>` is defined.',
      props: ["passwordToggle", "passwordToggleLabel"],
      selector: ".ui-field > .ui-end > .ui-button",
      slots: ["icon-checked", "icon-unchecked"],
    },
    {
      description:
        "Content below the input, inside the border, with a divider.",
      selector: ".ui-field > .ui-bottom",
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
        "The character count, `aria-hidden` so it stays out of the field's name. Near the limit, a live region outside the label announces the characters left.",
      props: ["characterCount", "characterCountLabel"],
      selector: ".ui-end-text > .ui-value",
    },
  ],
  root: {
    description:
      "Container element, a `<label>`, or the `<opui-text-field>` custom element with `passwordToggle`.",
    selector: ".ui-text-field",
  },
  slots: [
    {
      description: "Extra content inside the root, such as a `<datalist>`.",
      name: "default",
    },
  ],
  source: "TextField",
} satisfies ComponentApi
