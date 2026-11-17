import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` page smooth scrolling follows `--ui-motion`, like every transition, instead of only `prefers-reduced-motion`: `.ui-motion-off` and `.ui-motion-on` on `html`, or a theme that sets `--ui-motion`, turn it off and on. It reads the token with `if()`. A browser without `if()` follows `prefers-reduced-motion` and the two classes, not a theme's token, and `dist/opui.no-compat.css` leaves that fallback out.",
} satisfies Change
