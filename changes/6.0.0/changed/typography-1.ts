import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` inline `code` in rich text is rounded with `--ui-radius-small` (5px by default) like `kbd` and `mark`, instead of the full `--ui-radius`.",
  notes: {
    typography: `<a href="#inline-text-elements">Inline <code>code</code>, <code>kbd</code>, <code>mark</code> and <code>var</code></a> are rounded with <code>--ui-radius-small</code>, and the <a href="#blockquote">blockquote</a> bar and table rules follow <code>--ui-border-width-thick</code>.`,
  },
} satisfies Change
