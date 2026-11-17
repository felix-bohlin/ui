import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Progress` takes `round` (`.ui-round`), which draws the progress as a ring, `--ui-icon-size-large` wide, filled to `value` over `max` with typed `attr()`, and spins a quarter arc while indeterminate, or pulses under reduced motion. `--_ring-size` and `--_ring-border-width` resize it. Browsers without typed `attr()` show the bar.",
  notes: {
    progress: {
      default: `<a href="#round"><code>round</code></a> draws the progress as a ring for small spaces, in browsers with typed <code>attr()</code>.`,
      html: `<a href="#round"><code>.ui-round</code></a> draws the progress as a ring for small spaces, in browsers with typed <code>attr()</code>.`,
    },
  },
} satisfies Change
