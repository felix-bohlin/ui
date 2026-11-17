import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion`, `Callout`, `Card`, `Dialog`, `Drawer`, `Menu` and the `Select` picker read the optional `--ui-border-color-raised` for the edge of a raised surface: tonal and elevated cards, accordions and dialogs, callouts without a severity, drawers, menus and the picker. A theme sets it once to outline them all, or to `transparent` to drop the edges. `Drawer` takes `--_edge-border-color` for its edge alone.",
  notes: {
    callout: `<a href="#variants">Callouts</a> read <a href="#api"><code>--ui-shadow-surface</code></a>, and tonal callouts without a severity <code>--ui-border-color-raised</code>, when a theme sets them.`,
    dialog: `Dialogs have a border in the page background color, or <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, so they stay visible on tonal surfaces.`,
    drawer: `The edge reads <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, like menus and elevated cards, and <code>--_edge-border-color</code> sets it alone.`,
  },
} satisfies Change
