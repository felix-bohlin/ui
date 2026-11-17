import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Dialog`, `Fieldset`, `Range` and `Select` start every id they generate with the `id` you pass, or with one id they generate per instance when `id` is missing or empty: for `id="x"` the start and end text are `x-start-text` and `x-end-text`, the affixes, top and bottom of a Select `x-start`, `x-end`, `x-top` and `x-bottom`, the label and tick list of a Range `x-label` and `x-list`, the title of a Dialog `x-title` and, for a Fieldset rendered as another element, the legend `x-legend`.',
  notes: {
    dialog: components(
      `The generated title id starts with the dialog's <a href="#api"><code>id</code></a>: <code>x-title</code> for <code>id="x"</code>.`,
    ),
    range: components(
      `The ids the range generates start with its <a href="#api"><code>id</code></a>: <code>x-label</code>, <code>x-start-text</code>, <code>x-end-text</code> and <code>x-list</code> for <code>id="x"</code>.`,
    ),
  },
} satisfies Change
