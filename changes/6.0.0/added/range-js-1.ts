import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`range.js` (`opui-css/css/js/range.js`) keeps every `.ui-range` `<output class=\"ui-value\" data-live>` and the slider's `aria-valuetext` in sync with its slider once it's imported, after a form reset and in markup added after it loads, with one `input` and one `reset` listener and a `MutationObserver` on the document. `Range.astro` imports it; HTML pages can import it instead of wiring the output themselves. `initRange()` syncs the readouts again.",
} satisfies Change
