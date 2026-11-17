import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` no longer takes `divided`. Use `bordered` (`.ui-bordered`) ([#395](https://github.com/felix-bohlin/ui/issues/395)).",
  migrating: ["list"],
  notes: {
    list: slots(
      `<code>divided</code> is removed. Use <a href="#on-every-item"><code>bordered</code></a>.`,
    ),
  },
} satisfies Change
