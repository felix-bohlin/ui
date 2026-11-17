import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` slide the selected pill, or the line of `.ui-line`, to the tab you select over `--_indicator-duration` (`--ui-duration`), where anchor positioning works: one indicator on the root follows the checked tab's `::before`, and each tab draws its part of the track on its `::after`. Elsewhere, and in forced colors, the pill stays on each tab and fades.",
} satisfies Change
