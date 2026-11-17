import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Copy` component (`opui-copy.ui-copy`, `display: contents`) around a field or text. A button with `commandfor` set to its id and `command="--copy"` copies the value of its first `input` or `textarea`, or else its text without buttons, popovers and elements with `data-copy-ignore`, with `navigator.clipboard.writeText()`. A `<span class="ui-floating" popover aria-hidden="true">` label in the look of an outlined button, at the button\'s height and with its font size and corners, shows `copiedLabel` ("Copied") before the button for two seconds, opening with `--ui-ease-enter` and closing with `--ui-ease-exit`, and the `<span class="ui-sr-only" role="status">` inside announces it. The button itself doesn\'t change. The label closes a Tooltip on the button and keeps it closed while it shows, also in browsers without interest invokers (`css/compat/copy.css`). Without the Clipboard API, or when it refuses or doesn\'t answer within a second, the element copies through a selection with `document.execCommand("copy")`. Where that is blocked too, the label shows `failedLabel` ("Copy failed") until Esc, a click elsewhere or the next copy, and the element selects the text, focusing a field. Until `opui-css/elements/copy.js` loads, a copy button inside the element or right after it is hidden (`copy.css`).',
  notes: {
    copy: {
      default: `New component. A <a href="#basics">button that copies</a> a field's value or a text to the clipboard and confirms it with a label next to the button, run by the <code>&lt;opui-copy&gt;</code> custom element, which the component loads.`,
      html: `New component. A <a href="#basics">button that copies</a> a field's value or a text to the clipboard and confirms it with a label next to the button. Import <code>opui-css/elements/copy.js</code> for the <code>&lt;opui-copy&gt;</code> custom element that runs it.`,
    },
  },
} satisfies Change
