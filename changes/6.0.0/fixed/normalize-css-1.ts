import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` gives `.ui-light` and `.ui-dark` on an element other than `html` the page surface and text color. `theme.css` declares `--ui-color-scheme`, `light` on `html` and `dark` under the OS preference or `.ui-dark`, so `Typography` reads the right scheme without a class.",
} satisfies Change
