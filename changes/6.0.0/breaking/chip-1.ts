import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip`, `Drawer` and `Progress` in Astro and Vue no longer render the class of their default look: no `.ui-tonal` on a tonal `Chip` or `Progress`, and no `.ui-inline-start` on a `Drawer` that opens from the inline start. In HTML these classes add nothing and can go. CSS that targets them can use `.ui-chip:not(.ui-outlined)`, `.ui-progress:not(.ui-filled)` and `.ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end)` instead.",
  migrating: ["chip", "drawer", "progress"],
  notes: {
    chip: slots(
      `a tonal <a href="#variants">chip</a> no longer renders <code>.ui-tonal</code>. Target <code>.ui-chip:not(.ui-outlined)</code> in your CSS instead.`,
    ),
  },
} satisfies Change
