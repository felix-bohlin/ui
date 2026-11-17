import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion`, `Anchor`, `Card`, `Dialog`, `Drawer` and `Tooltip` no longer export a `Slots` type from `types.ts`, the `Callout` one drops `icon` and `title` and has `closeIcon` for the close button's icon, and the Vue `Drawer` types no longer export `DrawerSlots` or `DrawerFooterSlots`.",
} satisfies Change
