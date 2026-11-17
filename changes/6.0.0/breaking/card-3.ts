import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Card` actions sit at the end, like in `Accordion` and the `Dialog` and `Drawer` footers. `CardActions` `align="start"` (`.ui-align-start`) lines them up with the content, and `.ui-align-end` no longer does anything on them.',
  migrating: ["card"],
} satisfies Change
