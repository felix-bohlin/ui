import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DescriptionList` switches layout based on its own width instead of the page, shares space between long terms and values, and wraps long values. A nested list sizes to its content and follows the outer list's layout, and the leaders of `.ui-border-solid` and `.ui-border-dotted` only apply to the list's own items.",
} satisfies Change
