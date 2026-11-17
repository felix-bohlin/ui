import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`NumberField` component (`opui-number-field.ui-number-field`): a number field with decrease and increase buttons, styled by `text-field.css`, `button.css` and `number-field.css`, so it covers the browser\'s autofill color and gets a dashed border when invalid in forced colors, like `TextField`. The `<opui-number-field>` custom element steps the value when a button with `command="--step-down"` or `command="--step-up"` is pressed or held, or when a script calls its `stepDown()` or `stepUp()`, fires `input` and `change`, marks a button `aria-disabled="true"` at `min` or `max`, disables both buttons while the input is disabled, so Tab skips them (a disabled field also renders them disabled, so the server markup matches the hydrated one), marks both `aria-disabled` and doesn\'t step while the input is `aria-disabled`, and follows a form reset. Until it loads, the buttons are hidden and the input keeps the browser\'s spin buttons. The field fits its value (from `--_min-inline-size`, `4ch`), and a long start or end text wraps under it instead of widening it, unless `stretch` (`.ui-stretch`) fills the width. Takes `label`, `hideLabel`, `startText`, `endText`, `error`, `size`, `spread`, `stretch`, `variant`, `decreaseLabel` and `increaseLabel`, and the `decrease-icon` and `increase-icon` slots (`decreaseIcon` and `increaseIcon` in React and Svelte) for the button icons, binds `value` like `TextField`, links the start and end text with `aria-describedby` (`x-start-text` and `x-end-text` for `id="x"`), points the step buttons at the input with `aria-controls`, and loads the element itself in every framework.',
  notes: {
    "number-field": [
      components(
        `The start and end text ids start with the <a href="#api"><code>id</code></a>: <code>x-start-text</code> and <code>x-end-text</code> for <code>id="x"</code>.`,
      ),
      {
        default: `New component. A <a href="#basics">number field</a> with buttons that step the value down and up and repeat while held, run by the <code>&lt;opui-number-field&gt;</code> custom element, which the component loads. It fits its value unless <a href="#stretch"><code>stretch</code></a> fills the width. The <a href="#buttons">buttons</a> take translated labels and your own icons.`,
        html: `New component. A <a href="#basics">number field</a> with buttons that step the value down and up and repeat while held. Import <code>opui-css/elements/number-field.js</code> for the <code>&lt;opui-number-field&gt;</code> custom element that runs them. It fits its value unless <a href="#stretch"><code>.ui-stretch</code></a> fills the width. The <a href="#buttons">buttons</a> take translated labels and your own icons.`,
      },
    ],
  },
} satisfies Change
