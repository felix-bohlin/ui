import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text no longer overflows grid and flex parents with long words, URLs or code lines, and list items, figure content and table cells no longer push it wider than its container on narrow viewports. Inline `code`, `kbd` and `var` in table cells only break inside a word when it doesn't fit the table, so a narrow table keeps its columns wide enough for whole tokens.",
} satisfies Change
