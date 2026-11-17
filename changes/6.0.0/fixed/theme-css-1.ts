import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` keeps its colors in builds that rewrite `light-dark()` for older browsers, like the defaults of Vite 8 and Next 16. `html` sets a plain `color-scheme` (`light`, or `dark` under `prefers-color-scheme: dark`) before `var(--ui-color-scheme)`, so the rewritten colors follow the OS and `.ui-light` or `.ui-dark` on `html`. Every color was invalid in those builds before: filled buttons were transparent and the page had no background. The README says which settings keep `light-dark()` for the `--ui-color-scheme` knob and the classes on a part of the page.",
} satisfies Change
