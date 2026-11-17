import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Divider` reads a `--ui-divider-gap` theme token for the space around it. Cards, callouts, dialogs and drawers set it to `--ui-space-3`.",
  notes: {
    divider: `<a href="#spacing">Spacing</a> comes from <code>--ui-divider-gap</code>, which cards, callouts, dialogs and drawers make tighter.`,
  },
} satisfies Change
