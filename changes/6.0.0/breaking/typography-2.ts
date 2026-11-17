import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` theme tokens: `--ui-font-size-h1` to `--ui-font-size-h4` grow from one type scale step to the next over one shared viewport window, `--ui-fluid-min-inline-size` (20rem) to `--ui-fluid-max-inline-size` (48rem), with `progress()`, instead of each over its own `vi` slope. `--ui-font-size-h3` has a higher minimum (`--ui-font-size-500`), `--ui-font-size-h4` scales between `--ui-font-size-400` and `--ui-font-size-500` instead of a fixed size, and `--ui-font-size-h6` is `--ui-font-size-300`, so heading sizes no longer invert or drop below body text on narrow viewports. Browsers without `progress()` keep the `clamp()` sizes, a fallback that `dist/opui.no-compat.css` and `dist/opui.baseline-2026.css` and later leave out.",
  migrating: ["typography-and-rich-text"],
  notes: {
    typography: `<a href="#variants">heading sizes</a> changed. Sizes and line heights snap to <code>--ui-rhythm-step</code>, <code>h1</code> to <code>h4</code> grow together over one viewport window (<code>--ui-fluid-min-inline-size</code> to <code>--ui-fluid-max-inline-size</code>, with <code>progress()</code>), and the heading scale no longer inverts on narrow screens.`,
  },
} satisfies Change
