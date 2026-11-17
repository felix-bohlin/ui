import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` render their parts in the order they're drawn, `.ui-top`, `.ui-start`, the control, `.ui-end` and `.ui-bottom`, so Tab and screen readers reach them in that order in every browser. A button drawn before the control was reached after it. `reading-flow: grid-rows` on `.ui-field` keeps the drawn order for HTML that writes the parts in another order, where the browser supports it.",
} satisfies Change
