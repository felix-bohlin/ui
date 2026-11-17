import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar`, `Button` and `Chip` share one helper for `disabled`, `aria-disabled`, `href` and `type`, so they render those attributes the same way in every framework.",
} satisfies Change
