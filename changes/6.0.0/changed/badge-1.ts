import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Badge` indicator has a ring in the page background color (`--_border-color` is `--ui-surface`) instead of a border in its own fill color, so it stands out on a filled `Avatar` or `Button`.",
  notes: {
    badge: `The indicator has a <a href="#colors">ring in the page background color</a>, so it stands out on a filled avatar or button. Set <code>--_border-color</code> on another surface.`,
  },
} satisfies Change
