import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Chip` takes a `disabled` prop in Astro, React, Svelte and Vue. A button chip gets `disabled`, a link chip `aria-disabled="true"`.',
  notes: {
    chip: components(
      `<a href="#disabled"><code>disabled</code></a> works on button and link chips. A link chip gets <code>aria-disabled="true"</code>.`,
    ),
  },
} satisfies Change
