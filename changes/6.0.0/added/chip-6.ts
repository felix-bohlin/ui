import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Chip` takes `as="span"` in Astro, React, Svelte and Vue, for a chip inside a `<label>` or `<button>`, like a count in a tab.',
  notes: {
    chip: components(
      `<a href="#api"><code>as="span"</code></a> renders a chip that fits inside a <code>&lt;label&gt;</code> or <code>&lt;button&gt;</code>, like a count in a tab.`,
    ),
  },
} satisfies Change
