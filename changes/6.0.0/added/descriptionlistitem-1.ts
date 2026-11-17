import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DescriptionListItem` takes `total` (`.ui-total`), which draws a line above the item and makes it larger, bold and strong, for the total of an order summary or an invoice.",
  notes: {
    "description-list": `<a href="#total"><code>total</code></a> on the last item draws a line above it and makes it larger and bold, for an order summary.`,
  },
} satisfies Change
