import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry: "`Tooltip` uses `--ui-surface-inverse` and `--ui-on-inverse`.",
  notes: {
    tooltip: `The tooltip sits on <a href="#api"><code>--ui-surface-inverse</code></a> with <code>--ui-on-inverse</code> text, like <code>kbd</code>.`,
  },
} satisfies Change
