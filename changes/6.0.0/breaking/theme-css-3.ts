import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` holds `--ui-motion` and its `prefers-reduced-motion` default, which moved from `core/normalize.css`. The `.ui-motion-*` classes moved to `core/utils.css`. If you import single files, import `theme.css` and `utils.css` too, or `--ui-motion` is undefined and the `.ui-motion-*` classes are missing.",
} satisfies Change
