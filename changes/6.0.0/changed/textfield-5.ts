import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` read and tab through their parts in the order they're drawn, `.ui-top`, `.ui-start`, the control, `.ui-end` and `.ui-bottom` (`reading-flow: grid-rows` on `.ui-field`), where the browser supports it. A button drawn before the field was reached after it.",
} satisfies Change
