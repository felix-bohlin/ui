import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Drawer` in Astro and Vue takes parts instead of slots: `DrawerHeader`, `DrawerTitle`, `DrawerContent` and `DrawerFooter`. `DrawerTitle` replaces the `DrawerHeader` `heading` prop and names the drawer. A drawer is named by `DrawerTitle`, or by `aria-label` without one (5.x set no name itself). An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced. `DrawerHeader` closes its `Drawer` with `command="close"` (Invoker Commands) instead of a click handler, so it closes the drawer without hydration, and browsers without Invoker Commands need a polyfill. Outside a `Drawer`, it closes the dialog its `commandfor` names instead of the nearest `<dialog>`, and a dev warning says when `commandfor` is missing.',
  migrating: ["drawer"],
  notes: {
    drawer: slots(
      `<a href="#basics"><code>DrawerTitle</code> and <code>DrawerContent</code></a> replace the <code>heading</code> prop and the slots. <code>DrawerTitle</code> names the drawer; without it, pass <code>aria-label</code>. The <code>DrawerHeader</code> close button uses <code>command="close"</code>; outside a <code>Drawer</code>, set its <code>commandfor</code>.`,
    ),
  },
} satisfies Change
