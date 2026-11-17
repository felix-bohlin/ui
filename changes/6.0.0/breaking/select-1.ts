import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` items are typed `SelectItem`, with a `number | string` `value`, and take `label` instead of `text`, like `Menu` and `Range` items. Rename imports of `Item` from `components/Select/types`.",
  migrating: ["select"],
  notes: {
    select: slots(
      `<a href="#api"><code>items</code></a> take <code>label</code> instead of <code>text</code>.`,
    ),
  },
} satisfies Change
