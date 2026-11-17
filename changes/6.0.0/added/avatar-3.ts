import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` takes `variant`: `filled` (the default, the primary color), `tonal` (`.ui-tonal`, the primary tint through `--_tonal-bg-color` and `--_tonal-text-color`) and `outlined` (`.ui-outlined`, the border color in `--_outlined-border-color` with no fill). An image avatar has no fill in any variant.",
  notes: {
    avatar: `<a href="#variants"><code>variant</code></a> takes <code>tonal</code> for the primary tint and <code>outlined</code> for the border color with no fill.`,
  },
} satisfies Change
