import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range`, `Select`, `TextField` and `Textarea` with `spread` (`.ui-spread`) collapse to a column when narrower than `25rem`, a breakpoint that follows the reader's font size. The field was squeezed next to the label, and the `Range` container query had no container, so it never applied and the slider's minimum width could push its parent wider.",
} satisfies Change
