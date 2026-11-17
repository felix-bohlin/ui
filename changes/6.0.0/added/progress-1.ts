import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Progress` has a `--_loop-duration` property for the length of its indeterminate loop.",
  notes: {
    progress: `<a href="#component-properties"><code>--_loop-duration</code></a> sets the length of the <a href="#indeterminate">indeterminate</a> loop.`,
  },
} satisfies Change
