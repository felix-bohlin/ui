import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` `sup` and `sub` are `0.75em` in rich text and in `.ui-sup` and `.ui-sub`, and no longer change the line height.",
  notes: {
    typography: `<code>sup</code> and <code>sub</code> are <code>0.75em</code> in rich text and in <a href="#inline-text-elements"><code>.ui-sup</code> and <code>.ui-sub</code></a>, and no longer change the line height.`,
  },
} satisfies Change
