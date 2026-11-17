import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` types require `aria-label`, `aria-labelledby` or `children` in React and Svelte, so a button always has a name (types only).",
  notes: {
    button: {
      react: `<a href="#icon-only">Icon-only</a> buttons need <code>aria-label</code> or <code>aria-labelledby</code> when there are no <code>children</code> (types only).`,
      svelte: `<a href="#icon-only">Icon-only</a> buttons need <code>aria-label</code> or <code>aria-labelledby</code> when there are no <code>children</code> (types only).`,
    },
  },
} satisfies Change
