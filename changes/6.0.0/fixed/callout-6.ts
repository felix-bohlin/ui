import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Callout` only gives plain links and `.ui-link` its text color, so a link `Avatar`, `Button` or `Chip` in a callout or a toast keeps its own, where a filled link button's label took the color of its fill.",
} satisfies Change
