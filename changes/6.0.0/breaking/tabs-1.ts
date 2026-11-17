import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone, use `--_selected-bg-color`, `--_selected-text-color`, `--_indicator-bg-color` and `--_track-bg-color`, or a `variant`. The selected pill is outlined with `--ui-control-border-color`, or `--ui-field-border-color`, so it reaches 3:1 against the track without the shadow. The open panel gets a `--ui-space-2` top margin. In dark mode the selected pill is `--ui-text-strong` at `--ui-state-selected-alpha-accent`, so it follows a theme's grays.",
  migrating: ["tabs"],
  notes: {
    tabs: `<a href="#basics">restyled</a> as a segmented control. <code>--_accent-color</code> and <code>--_bg-color</code> are gone, use a <a href="#filled">variant</a> or <code>--_selected-bg-color</code>, <code>--_selected-text-color</code>, <code>--_indicator-bg-color</code> and <code>--_track-bg-color</code>.`,
  },
} satisfies Change
