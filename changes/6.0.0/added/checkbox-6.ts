import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio` and `Switch` read the optional `--ui-choice-border-color` and `--ui-choice-border-width` for their unchecked border and track edge. When unset, they keep `--ui-field-border-color` and `--ui-field-border-width`, and the color promises 3:1 against `--ui-surface`. shadcn sets it to its primary, like shadcn/ui, so its faint field border no longer draws the choices.",
  notes: {
    checkbox: [
      `The unchecked border reads <a href="#api"><code>--ui-choice-border-color</code></a> and <code>--ui-choice-border-width</code> when a theme sets them, and <code>--ui-field-border-color</code>, which reaches 3:1 against the page by default, and <code>--ui-field-border-width</code> when it doesn't.`,
      `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    ],
    radio: [
      `The unchecked ring reads <a href="#api"><code>--ui-choice-border-color</code></a> and <code>--ui-choice-border-width</code> when a theme sets them, and <code>--ui-field-border-color</code>, which reaches 3:1 against the page by default, and <code>--ui-field-border-width</code> when it doesn't.`,
      `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    ],
    switch: [
      `The unchecked track border reads <a href="#api"><code>--ui-choice-border-color</code></a> and <code>--ui-choice-border-width</code> when a theme sets them, and <code>--ui-field-border-color</code> and <code>--ui-field-border-width</code> when it doesn't, like the checkbox and radio borders.`,
      `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    ],
  },
} satisfies Change
