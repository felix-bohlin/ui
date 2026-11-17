import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleGroup` takes a bindable `value`: `bind:value` in Svelte, `v-model` in Vue, `value`, `defaultValue` and `onValueChange` in React, and in Astro the `value` of the buttons to check on the server. It is a string, and an array of strings with `multiple`, in the types of every framework, and a `ToggleButton` in the group takes its checked state from it once the group has one. The button's own `checked` or `defaultChecked` is then ignored, and a dev warning says so.",
  notes: {
    toggle: {
      astro: `<code>value</code> on <code>ToggleGroup</code> checks the buttons whose <code>value</code> matches (<a href="#binding">Binding</a>).`,
      react: `<code>ToggleGroup</code> takes <code>value</code>, <code>defaultValue</code> and <code>onValueChange</code> to control the selection (<a href="#binding">Binding</a>).`,
      svelte: `Bind the selection with <code>bind:value</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
      vue: `Bind the selection with <code>v-model</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
    },
  },
} satisfies Change
