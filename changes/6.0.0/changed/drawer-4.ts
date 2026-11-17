import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` sits on `--ui-surface-elevated`, like `Dialog` and `Menu`, and borders and field borders inside it read `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`.",
  notes: {
    drawer: `The panel sits on <a href="#api"><code>--ui-surface-elevated</code></a>, like Dialog and Menu.`,
  },
} satisfies Change
