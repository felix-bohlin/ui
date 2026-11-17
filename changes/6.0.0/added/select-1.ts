import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Select` items take `selected`, and `value` preselects options in Astro, Svelte and Vue, and `defaultValue` or `value` in React (an array with `multiple`), matched as text like the native select, so `"2"` picks an item valued `2`. Options render `selected` on the server.',
  notes: {
    select: {
      default: `<a href="#preselected">Preselect</a> options with <code>value</code> or <code>selected</code> on an item.`,
      html: `<a href="#preselected">Preselect</a> options with <code>selected</code>.`,
    },
  },
} satisfies Change
