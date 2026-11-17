import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` (rounded), `Checkbox`, `Tooltip`, file inputs outside `TextField`, `kbd`, `mark` and `var` never get rounder than `--ui-radius`.",
  notes: {
    avatar: `Rounded avatars never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
  },
} satisfies Change
