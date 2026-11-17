import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` `.ui-icon` sizes an `svg` to `--ui-icon-size` and keeps it from shrinking in a flex row, with `.ui-small` and `.ui-large` for `--ui-icon-size-small` and `--ui-icon-size-large`.",
  notes: {
    typography: `<a href="#icon"><code>.ui-icon</code></a> sizes an <code>svg</code> to <code>--ui-icon-size</code>, with <code>.ui-small</code> and <code>.ui-large</code>.`,
  },
} satisfies Change
