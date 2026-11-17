import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` `kbd`, `var`, `.ui-kbd` and `.ui-var` sit on `--ui-surface-inverse` with `--ui-on-inverse` text, like `Tooltip`, instead of on `--ui-text`.",
  notes: {
    typography: `<a href="#inline-text-elements"><code>kbd</code> and <code>var</code></a> sit on <code>--ui-surface-inverse</code> with <code>--ui-on-inverse</code> text, like tooltips.`,
  },
} satisfies Change
