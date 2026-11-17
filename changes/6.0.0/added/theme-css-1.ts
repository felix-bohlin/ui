import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-icon-size-x-small` (`0.75rem`) and `--ui-radius-large` (`--ui-radius` times 1.5) to complete their families, and `--ui-shadow-color` under Elevation, the color and base opacity of every default shadow, a `light-dark()` pair of OKLCH colors that is darker in dark mode (`.ui-dark`, also on a part of the page, and the OS preference), so shadows show on dark surfaces.",
} satisfies Change
