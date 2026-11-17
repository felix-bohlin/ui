import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ListItem` takes an `icon-checked` slot (`iconChecked` in React and Svelte, `.ui-icon-checked`): an icon of your own at the end of the row, shown while the row is selected or current. In a `Menu` or a `role="listbox"` list it replaces the check.',
  notes: {
    list: {
      astro: `The <a href="#selected"><code>icon-checked</code></a> slot of <code>ListItem</code> shows your own icon at the end of a selected or current row.`,
      vue: `The <a href="#selected"><code>icon-checked</code></a> slot of <code>ListItem</code> shows your own icon at the end of a selected or current row.`,
      react: `The <a href="#selected"><code>iconChecked</code></a> prop of <code>ListItem</code> shows your own icon at the end of a selected or current row.`,
      svelte: `The <a href="#selected"><code>iconChecked</code></a> snippet of <code>ListItem</code> shows your own icon at the end of a selected or current row.`,
      html: `A <a href="#selected"><code>.ui-icon-checked</code></a> shows your own icon at the end of a selected or current row.`,
    },
  },
} satisfies Change
