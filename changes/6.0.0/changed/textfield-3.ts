import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea`, `Select` and `Range` with `spread` split their container into equal label and field columns, so spread fields line up at one width. The fixed `30ch` textarea and `25ch` range minimums are gone.",
} satisfies Change
