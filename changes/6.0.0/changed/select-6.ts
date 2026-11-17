import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` picker paints `--ui-surface-elevated` with the raised edge and the `-on-raised` borders inside, like `Menu`, instead of `--ui-surface-filled` with a field border, so a theme that tunes overlays changes both.",
  notes: {
    select: `The <a href="#variants">picker</a> is <code>--ui-surface-elevated</code> with the raised edge, like menus, and reads <code>--ui-border-color-raised</code> when a theme sets it.`,
  },
} satisfies Change
