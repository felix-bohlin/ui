import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ListItem` `headline` is `label`, and the `text` slot is gone: `label` and `description` take a string or, as slots of the same name, rich content, rendered as the two paragraphs in `.ui-text`. The default slot adds more content after them.",
  migrating: ["list"],
  notes: {
    list: slots(
      `<code>ListItem</code> <a href="#text"><code>label</code></a> replaces <code>headline</code>, and the <code>label</code> and <code>description</code> slots replace the <code>text</code> slot.`,
    ),
  },
} satisfies Change
