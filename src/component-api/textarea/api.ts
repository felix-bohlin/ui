import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Textarea",
  css: ["text-field", "textarea"],
  keyboard: [
    {
      description:
        "Moves focus to the next element, like in any field. It doesn't type a tab character.",
      keys: ["Tab"],
    },
    {
      description:
        "Starts a new line. Unlike in a text field, it doesn't submit the form.",
      keys: ["Enter"],
    },
  ],
  model: {
    description: "The textarea value.",
    prop: "value",
    type: "string",
  },
  notes: {
    ...passThrough("textarea", ".ui-textarea", ["maxlength", "placeholder"], {
      react: "Use `value` with `onChange`, or `defaultValue`.",
    }),
    html: 'For a character count, add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`. With a label, give `.ui-label` an id and point `aria-labelledby` on the field at it, then at `.ui-start` and `.ui-end`, and point its `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-bottom` and `.ui-end-text`, so a hint or an error is read as the description, not in the name.',
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description:
        "Lets the width follow the content and allows resizing in both directions.",
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
      default: "false",
      description:
        'Dims the field and blocks input. `aria-disabled="true"` looks the same, but keeps the field focusable, its text editable and its value in the form.',
      group: "Disabled",
      inherited: true,
      part: "textarea",
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
      part: "textarea",
      prop: "error",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.",
      group: "Label",
      part: ".ui-textarea > span",
      prop: "hideLabel",
    },
    {
      description:
        'The id of the `<textarea>`. The ids the component generates start with it: `x-label`, `x-start`, `x-end`, `x-top`, `x-bottom`, `x-start-text` and `x-end-text` for `id="x"`.',
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "The name of the `<textarea>`. Inside a `FieldGroup`, the group's `name` when omitted.",
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
      part: "textarea",
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
        "Pushes the label and start text to one side and the textarea to the other.",
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
      description: "The boxed textarea area.",
      selector: ".ui-field",
    },
    {
      description:
        "Content above the textarea, inside the border, with a divider.",
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
      code: "<textarea>",
      description: "The textarea element.",
      model: true,
      selector: "textarea",
    },
    {
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-field > .ui-end",
      slots: ["end"],
    },
    {
      description:
        "Content below the textarea, inside the border, with a divider.",
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
        "The character count, `aria-hidden` so it stays out of the field's description. Near the limit, a live region outside the label announces the characters left.",
      props: ["characterCount", "characterCountLabel"],
      selector: ".ui-end-text > .ui-value",
    },
  ],
  root: {
    description:
      "Container element: a `<label>`, or a `<div>` when there's no label.",
    selector: ".ui-textarea",
  },
  slots: [
    {
      description: "Extra content inside the root.",
      name: "default",
    },
  ],
  source: "Textarea",
} satisfies ComponentApi
