import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text inline `code`, `kbd` and `var` no longer make their line taller than the line height, and the background of inline `code` stays inside its line: the padding above and below it shrinks to the space the line leaves, up to `0.5ex`, so code on neighboring lines no longer overlaps with line heights under 1.75.",
} satisfies Change
