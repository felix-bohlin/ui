import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` and `ControlGroup` with `.ui-primary` and `.ui-tonal` read the optional `--ui-primary-tonal` and `--ui-on-primary-tonal`. When unset, they keep the palette tint. m3 sets Material's `primary-container`, shadcn its `secondary`.",
  notes: {
    button: `Primary tonal buttons read <a href="#api"><code>--ui-primary-tonal</code></a> and <code>--ui-on-primary-tonal</code> when a theme sets them.`,
    "control-group": `Primary tonal groups read <a href="#api"><code>--ui-primary-tonal</code></a> and <code>--ui-on-primary-tonal</code> when a theme sets them.`,
  },
} satisfies Change
