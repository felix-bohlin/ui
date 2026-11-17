import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion`, `Callout`, `Card` and `Dialog` keep together on one page in print (`break-inside: avoid`), so a printed card or callout no longer starts on one page and ends on the next. One taller than the page still breaks.",
} satisfies Change
