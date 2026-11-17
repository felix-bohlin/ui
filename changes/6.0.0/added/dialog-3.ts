import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry: "`Dialog` types `closedby` in every framework.",
  notes: {
    dialog: components(
      `<a href="#how-to-close"><code>closedby</code></a> is typed in every framework.`,
    ),
  },
} satisfies Change
