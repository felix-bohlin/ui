import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` no longer declares `command`, `commandfor` and `interestfor` as props. They pass through as attributes.",
  notes: {
    avatar: {
      vue: `<code>command</code>, <code>commandfor</code> and <code>interestfor</code> pass through as attributes instead of props (<a href="#api">API</a>).`,
    },
  },
} satisfies Change
