import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`elements/` holds the custom elements, one module per element in `opui-css/elements/*`, such as `opui-css/elements/number-field.js`. Each one defines its element once, renders in the light DOM so the component CSS styles it, and does nothing on the server. It works whether its module loads before or after its markup, drops its listeners, timers and open popovers when the element leaves the page, and picks up again when it comes back. It exports the element\'s class, named after the component with an `Element` suffix (`NumberFieldElement`), and its types add the tag to `HTMLElementTagNameMap`, so `document.querySelector("opui-number-field")` returns a `NumberFieldElement`. The Astro components load theirs, React, Svelte and Vue load theirs on the client, and HTML pages import them.',
} satisfies Change
