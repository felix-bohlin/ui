import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` take a `variant` prop. `filled` (`.ui-filled`) fills the selected tab with `--ui-selected-strong`, the primary color unless a theme sets it, with its focus ring in `--ui-on-selected-strong` so the ring keeps 3:1 on the fill, `line` (`.ui-line`) drops the track and marks the selected tab with a line, and `outlined` (`.ui-outlined`) uses a bordered track without a background.",
  notes: {
    tabs: [
      {
        default: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with the <code>variant</code> prop.`,
        html: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with <code>.ui-filled</code>, <code>.ui-line</code> and <code>.ui-outlined</code>.`,
      },
      `The selected tab of <a href="#filled">filled</a> tabs reads <code>--ui-selected-strong</code> and <code>--ui-on-selected-strong</code>.`,
    ],
  },
} satisfies Change
