import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`CalloutActions` part (`.ui-actions`) in Astro, React, Svelte and Vue puts a row of buttons under the callout's content, lined up with it. A `.ui-button` that is a direct child of a `Callout` sits at the end of the first row, for a close button. The toaster keeps its own layout.",
  notes: {
    callout: {
      ...components(
        `<a href="#actions"><code>CalloutActions</code></a> puts a row of buttons under the content, and a <a href="#dismissible">close button</a> sits at the end of the first row.`,
      ),
      html: `<a href="#actions"><code>.ui-actions</code></a> puts a row of buttons under the content, and a <a href="#dismissible">close button</a> sits at the end of the first row.`,
    },
  },
} satisfies Change
