import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` and `Drawer` show a subtle scroll shadow under the header and above the footer while the content scrolls (scroll-state container queries). A `Drawer` clips its own overflow, so only its content scrolls, also without a footer.",
} satisfies Change
