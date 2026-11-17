import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` take a bindable `value`: `bind:value` in Svelte, `v-model` in Vue, `value`, `defaultValue` and `onValueChange` in React, and in Astro the `value` of the tab to select on the server. A `TabsItem` with a `value` takes its checked state from it once the tabs have one, so a tab that loses its check to another one no longer drifts from the state. The item's own `checked` or `defaultChecked` is then ignored, and a dev warning says so.",
  notes: {
    tabs: {
      astro: `<code>value</code> on <code>Tabs</code> selects the item whose <code>value</code> matches (<a href="#binding">Binding</a>).`,
      react: `<code>Tabs</code> take <code>value</code>, <code>defaultValue</code> and <code>onValueChange</code> to control the selected tab (<a href="#binding">Binding</a>).`,
      svelte: `Bind the selected tab with <code>bind:value</code> on <code>Tabs</code> (<a href="#binding">Binding</a>).`,
      vue: `Bind the selected tab with <code>v-model</code> on <code>Tabs</code> (<a href="#binding">Binding</a>).`,
    },
  },
} satisfies Change
