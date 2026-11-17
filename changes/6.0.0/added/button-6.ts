import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button` with `commandfor` or `popovertarget` keeps its pressed colors while the popover right after it is open, like a `Menu` trigger, without the press scale. A tooltip (`popover="hint"`) doesn\'t count.',
  notes: {
    button: `A button with <code>commandfor</code> or <code>popovertarget</code> keeps its <a href="#variants">pressed colors</a> while the popover right after it is open. A tooltip doesn't count.`,
  },
} satisfies Change
