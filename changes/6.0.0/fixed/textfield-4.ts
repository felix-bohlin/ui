import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` keep their field height when a grid or flex parent stretches them, e.g. next to a field with end text. The extra space went into the field.",
} satisfies Change
