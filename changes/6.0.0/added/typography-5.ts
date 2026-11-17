import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` `.ui-swatch` is a small dot for a color legend. It takes a severity class (`.ui-info`) for its tone, or any color in `--_swatch-bg-color`, and defaults to the palette accent of the scope it sits in. In print, `print-color-adjust: exact` keeps its color.",
  notes: {
    typography: `<a href="#swatch"><code>.ui-swatch</code></a> is a small dot for a color legend, painted by a severity class or <code>--_swatch-bg-color</code>.`,
  },
} satisfies Change
