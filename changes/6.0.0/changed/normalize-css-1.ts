import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` sets `box-shadow` instead of `-webkit-box-shadow` on autofilled fields, and font and color inheritance on `::file-selector-button`.",
} satisfies Change
