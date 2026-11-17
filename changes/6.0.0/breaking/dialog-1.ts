import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Dialog` in Astro and Vue takes parts instead of slots: `DialogHeader`, `DialogTitle`, `DialogContent` and `DialogFooter`. `actionsAlign` is `align` on `DialogFooter`. `aria-labelledby` points at the `DialogTitle` unless you pass `aria-label` or `aria-labelledby`, so a dialog without a `DialogTitle` needs `aria-label`. An `id` on `DialogTitle` only applies when the dialog has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced. `align="start"` on `DialogFooter` adds `.ui-align-start`; `end` is the default and adds no class.',
  migrating: ["dialog"],
  notes: {
    dialog: slots(
      `<a href="#api"><code>DialogHeader</code>, <code>DialogTitle</code>, <code>DialogContent</code> and <code>DialogFooter</code></a> replace the slots, and <code>align</code> on <code>DialogFooter</code> replaces <code>actionsAlign</code>. <code>DialogTitle</code> names the dialog.`,
    ),
  },
} satisfies Change
