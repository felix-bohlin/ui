import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` and `Drawer` open over `--ui-duration-slow` (`0.25s`, was `0.2s`) with `--ui-ease-enter`, and close over the same duration with `--ui-ease-exit`, as the tokens describe. `Dialog` used to close at once.",
  notes: {
    dialog: [
      `Opens over <a href="#api"><code>--ui-duration-slow</code></a>, the overlay duration.`,
      `A <a href="#modal">modal dialog</a> fades and scales in with its backdrop, and fades and scales out again when it closes, over <code>--ui-duration-slow</code>.`,
    ],
    drawer: `Opens over <a href="#api"><code>--ui-duration-slow</code></a> with <code>--ui-ease-enter</code> and closes with <code>--ui-ease-exit</code>.`,
  },
} satisfies Change
