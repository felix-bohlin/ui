import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`normalize.css` reads `--ui-line-height-relaxed` for the page line height, `--ui-icon-size-large` for an `svg` without `width` (`1.5rem` instead of `2rem`) and `--ui-space-7` for the scroll margin of `:target`.",
} satisfies Change
