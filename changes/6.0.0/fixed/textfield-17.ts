import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Select` and `Textarea` cover the browser's autofill color with the field's own background, so an autofilled input in a `.ui-filled` field no longer shows a page-colored box, and keep the field's text color, so an autofilled value no longer looks fainter than a typed one.",
} satisfies Change
