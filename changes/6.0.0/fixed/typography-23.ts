import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text `pre` and `.ui-code-block` wrap long lines in print (`white-space: pre-wrap`), so the end of a line wider than the page is no longer cut off. On screen they still scroll.",
} satisfies Change
