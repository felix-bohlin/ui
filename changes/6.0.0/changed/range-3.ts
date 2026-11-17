import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` generates the `<datalist>` id when `items` or the `datalist` slot is used, so `list` is optional.",
  notes: {
    range: components(
      `<a href="#tick-marks"><code>items</code></a> renders a linked <code>&lt;datalist&gt;</code> without a <code>list</code> id.`,
    ),
  },
} satisfies Change
