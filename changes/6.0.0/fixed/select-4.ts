import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select`, `Textarea` and `TextField` draw the focus ring around the field, like `Button`, only when the control itself has focus, not a link in the top or bottom slot. The border keeps its color while the ring shows.",
} satisfies Change
