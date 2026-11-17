import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` no longer hides `::-webkit-details-marker` on a summary with a `.ui-marker`. Its `display: flex` removes the native marker in every current browser; only Safari before 18.2 drew it that way.",
} satisfies Change
