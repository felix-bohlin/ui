import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List` rows with any `aria-current` but `false`, like `true` on the chosen button, get the current row look, not only `aria-current="page"`, also in a `Menu`.',
  notes: {
    list: `Rows with any <a href="#selected"><code>aria-current</code></a> but <code>false</code> look current, like <code>true</code> on a button, not only <code>page</code>.`,
  },
} satisfies Change
