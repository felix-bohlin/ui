import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` `kbd`, `var`, `.ui-kbd` and `.ui-var` no longer draw a border in their own background color. The border width is folded into the padding, so the box keeps its size.",
} satisfies Change
