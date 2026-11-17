import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` severity classes (`.ui-success`, `.ui-critical` and the rest) on `.ui-p`, `.ui-caption` and `.ui-overline` color the text in that tone, through `--ui-palette-text`.",
  notes: {
    typography: `A <a href="#severity">severity class</a> on <code>.ui-p</code>, <code>.ui-caption</code> or <code>.ui-overline</code> colors the text in that tone, and <a href="#tabular-numbers"><code>.ui-tabular-nums</code></a> lines numbers up.`,
  },
} satisfies Change
