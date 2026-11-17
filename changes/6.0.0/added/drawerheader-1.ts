import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DrawerHeader` takes a `commandfor` prop (the drawer `id`). Inside a `Drawer` it defaults to the drawer's `id`, and the close button uses `command=\"close\"` (Invoker Commands). Outside a `Drawer`, set `commandfor` to the dialog's `id`. A dev warning says when it's missing.",
  notes: {
    drawer: components(
      `A <code>Drawer</code> without an <code>id</code> warns in development, since its trigger and <code>DrawerHeader</code> point at it (<a href="#basics">Basics</a>).`,
    ),
  },
} satisfies Change
