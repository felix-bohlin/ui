import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Spinner` styles have no specificity (`:where()`), so a page's own `::before` rules override them, like other component roots.",
  notes: {
    spinner: `The spinner styles have no specificity (<code>:where()</code>), so your own <code>::before</code> rules override them (<a href="#api">API</a>).`,
  },
} satisfies Change
