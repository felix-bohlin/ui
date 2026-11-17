import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DescriptionList` items are plain `div`s: `DescriptionListItem` no longer renders `.ui-item`, and the list styles `dl.ui-description-list > div`. Drop `.ui-item` from the items in HTML, and target `dl.ui-description-list > div` instead of `.ui-item` in your CSS.",
  migrating: ["description-list"],
  notes: {
    "description-list": {
      ...slots(
        `<a href="#border">items</a> render a plain <code>div</code> without <code>.ui-item</code>.`,
      ),
      html: `<a href="#border">items</a> are plain <code>div</code>s without <code>.ui-item</code>.`,
    },
  },
} satisfies Change
