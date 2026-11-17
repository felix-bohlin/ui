import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` and `Badge` no longer shrink in flex rows, so an icon with a badge in an `Accordion` summary keeps its size next to long text. A bare `img` or `svg` in the summary keeps its size too.",
} satisfies Change
