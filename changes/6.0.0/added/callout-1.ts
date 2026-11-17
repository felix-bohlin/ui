import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Callout` takes `closeButton` in Astro, React, Svelte and Vue: the root becomes `<opui-callout>` with `role="article"` and an id, generated when it\'s left out, and a close `Button` named by `closeLabel` ("Close") sits at the end of the first row with `command="--dismiss"`, its icon in the `close-icon` slot (`closeIcon` in React and Svelte). The element (`opui-css/elements/callout.js`) fires a cancelable `dismiss` event that bubbles (`onDismiss` in React, `ondismiss` in Svelte, `@dismiss` in Vue), then sets `hidden` on the callout instead of removing it and moves focus that was inside it to the next focusable element after it, or else the one before, or the body. `dismiss()` does the same from a script. Until the element is defined, the close button is hidden (`callout.css`), and the React component ignores it until it has hydrated, so a press before hydration no longer hides the callout without `onDismiss`. Without `closeButton`, the callout is the `<article>` it was.',
  notes: {
    callout: {
      astro: `<a href="#dismissible"><code>closeButton</code></a> adds a close button that hides the callout, moves focus out of it and fires a cancelable <code>dismiss</code> event first. The <code>close-icon</code> slot replaces its icon.`,
      html: `<a href="#dismissible"><code>&lt;opui-callout&gt;</code></a> hides itself on <code>command="--dismiss"</code>, moves focus out of it and fires a cancelable <code>dismiss</code> event first. Import <code>opui-css/elements/callout.js</code>.`,
      react: `<a href="#dismissible"><code>closeButton</code></a> adds a close button that hides the callout and moves focus out of it. <code>onDismiss</code> runs first and can keep it with <code>preventDefault()</code>, and <code>closeIcon</code> replaces its icon.`,
      svelte: `<a href="#dismissible"><code>closeButton</code></a> adds a close button that hides the callout and moves focus out of it. <code>ondismiss</code> runs first and can keep it with <code>preventDefault()</code>, and the <code>closeIcon</code> snippet replaces its icon.`,
      vue: `<a href="#dismissible"><code>closeButton</code></a> adds a close button that hides the callout and moves focus out of it. <code>@dismiss</code> runs first and can keep it with <code>preventDefault()</code>, and the <code>close-icon</code> slot replaces its icon.`,
    },
  },
} satisfies Change
