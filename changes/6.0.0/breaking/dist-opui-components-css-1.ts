import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`dist/opui.components.css` needs `core/normalize.css`, or another reset that makes every box `border-box`, as the README now says: `Checkbox` and `Radio` no longer set `box-sizing` themselves, like the other components. Load `normalize.css` with it, or set `box-sizing: border-box` on every element in your own reset.",
} satisfies Change
