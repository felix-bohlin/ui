import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField` takes `passwordToggle`: on a `type="password"` field, a button at the end shows and hides the password, with `aria-pressed` and the name `passwordToggleLabel` ("Show password" by default). The root becomes the `<opui-text-field>` custom element (`opui-css/elements/text-field.js`) with a `<label for>`, since a button inside a `<label>` joins the input\'s accessible name, and the start and end text describe the input. The password hides again when the form is submitted or reset, or the input is disabled, by itself or by a `fieldset`. The button is disabled while the input is, and `aria-disabled` while the input is, also when a script changes it later, and hidden until the element is defined. The `icon-unchecked` and `icon-checked` slots (`iconUnchecked` and `iconChecked` in React and Svelte) replace its eye icons, wrapped in `.ui-icon-unchecked` and `.ui-icon-checked`, and a `Button` treats either wrapper like a direct `svg`.',
  notes: {
    "text-field": {
      astro: `<a href="#password-toggle"><code>passwordToggle</code></a> adds a button that shows and hides the password, run by the <code>&lt;opui-text-field&gt;</code> custom element, which the component loads. Its icons take the <code>icon-unchecked</code> and <code>icon-checked</code> slots.`,
      vue: `<a href="#password-toggle"><code>passwordToggle</code></a> adds a button that shows and hides the password, run by the <code>&lt;opui-text-field&gt;</code> custom element, which the component loads. Its icons take the <code>icon-unchecked</code> and <code>icon-checked</code> slots.`,
      react: `<a href="#password-toggle"><code>passwordToggle</code></a> adds a button that shows and hides the password, run by the <code>&lt;opui-text-field&gt;</code> custom element, which the component loads. Its icons take the <code>iconUnchecked</code> and <code>iconChecked</code> props.`,
      svelte: `<a href="#password-toggle"><code>passwordToggle</code></a> adds a button that shows and hides the password, run by the <code>&lt;opui-text-field&gt;</code> custom element, which the component loads. Its icons take the <code>iconUnchecked</code> and <code>iconChecked</code> snippets.`,
      html: `<a href="#password-toggle">Password toggle</a>: <code>&lt;opui-text-field&gt;</code> with a <code>&lt;label for&gt;</code> and a <code>command="--toggle-password"</code> button shows and hides the password. Import <code>opui-css/elements/text-field.js</code>.`,
    },
  },
} satisfies Change
