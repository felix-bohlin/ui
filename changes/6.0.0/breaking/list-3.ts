import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` styles `.ui-start` and `.ui-end` only as direct children of a row, or of the `a`, `button` or `label` directly in it. One inside another wrapper no longer gets the row layout.",
  migrating: ["list"],
  notes: {
    list: {
      html: `<a href="#start-items"><code>.ui-start</code></a> and <code>.ui-end</code> are only styled as direct children of a row, or of its <code>a</code>, <code>button</code> or <code>label</code>.`,
    },
  },
} satisfies Change
