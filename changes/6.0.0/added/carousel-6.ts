import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Carousel` takes `stretch` (`.ui-stretch`), which stretches each item's content, such as a card, to the item's height.",
  notes: {
    carousel: {
      default: `<a href="#stretch">Stretch</a> cards to equal height with the <code>stretch</code> prop.`,
      html: `<a href="#stretch">Stretch</a> cards to equal height with <code>.ui-stretch</code>.`,
    },
  },
} satisfies Change
