import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` thumb, halo and track fill follow `--_accent` on `.ui-range`.",
  notes: {
    range: `The thumb, its halo and the track fill follow <code>--_accent</code> on <code>.ui-range</code> (<a href="#under-the-hood">Under the hood</a>).`,
  },
} satisfies Change
