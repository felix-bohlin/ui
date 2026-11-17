import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` rows no longer force every element inside them to the row's font size, so a `Chip`, `Badge` or `Button` in `.ui-start` or `.ui-end` keeps its own size.",
} satisfies Change
