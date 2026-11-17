import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField`, `Textarea`, `Select`, `Switch`, `Checkbox`, `Radio` and `Range` are marked invalid with `aria-invalid="true"` on the control instead of `data-invalid` on the root. `error` in Astro and Vue sets only `aria-invalid`. Replace `data-invalid` on the root with `aria-invalid="true"` on the `<input>`, `<select>` or `<textarea>`.',
  migrating: [
    "checkbox",
    "radio",
    "range",
    "select",
    "switch",
    "text-field",
    "textarea",
  ],
  notes: {
    checkbox: {
      ...slots(
        `<code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each checkbox in an invalid <a href="#field-group-validation">group</a>.`,
      ),
      html: `mark an invalid checkbox with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
    },
    radio: {
      ...slots(
        `set <code>error</code> on each <code>Radio</code> in an invalid group instead of <code>data-invalid</code> on the <code>Fieldset</code> (<a href="#field-group-validation">Validation</a>).`,
      ),
      html: `mark an invalid group with <code>aria-invalid="true"</code> on each radio instead of <code>data-invalid</code> on the fieldset (<a href="#field-group-validation">Validation</a>).`,
    },
    range: {
      html: `mark an invalid range with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    select: {
      ...slots(
        `<code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `mark an invalid select with <code>aria-invalid="true"</code> on the <code>&lt;select&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    switch: {
      ...slots(
        `<code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each switch in an invalid <a href="#field-group-validation">group</a>.`,
      ),
      html: `mark an invalid switch with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
    },
    "text-field": {
      ...slots(
        `<code>error</code> only sets <code>aria-invalid="true"</code> on the input, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    textarea: {
      ...slots(
        `<code>error</code> only sets <code>aria-invalid="true"</code> on the textarea, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;textarea&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
  },
} satisfies Change
