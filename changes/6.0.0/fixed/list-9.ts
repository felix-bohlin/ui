import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` only caps the start column at the icon size when it holds an `svg` directly, so an `Avatar` with an icon keeps its size.",
} satisfies Change
