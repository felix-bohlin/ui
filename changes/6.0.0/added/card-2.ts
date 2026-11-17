import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` takes `.ui-card-link` on a link to make the whole card clickable. Other links, buttons and fields in the card stay clickable, a field with its start and end text included.",
  notes: {
    card: `Add <code>.ui-card-link</code> to a link to make the <a href="#clickable">whole card clickable</a>.`,
  },
} satisfies Change
