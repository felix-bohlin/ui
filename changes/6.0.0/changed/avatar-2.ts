import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar`, `ControlGroup` and `List` sizes follow `--ui-control-size` and `--ui-button-size-*`.",
  notes: {
    avatar: `<a href="#sizes">Sizes</a> follow <code>--ui-control-size</code> and its <code>-x-small</code>, <code>-small</code> and <code>-large</code> steps, which buttons share by default.`,
    "control-group": `<a href="#sizes">Sizes</a> follow <code>--ui-control-size</code> and <code>--ui-button-size-*</code>, like buttons.`,
  },
} satisfies Change
