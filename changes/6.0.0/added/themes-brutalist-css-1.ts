import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`themes/brutalist.css` is a neobrutalism look: the `oklch(0.92 0.019 266)` and `oklch(0.283 0.019 276)` pages, white fields and tracks, 500 weight body text, 700 headings, 14px control text, main-colored filled buttons and selected items, state layers instead of fills on hover, black links, main-colored tooltips, 24px card padding, 8px menu item padding, 16px checks with 5px corners, also when an app raises `--ui-radius`, that keep their 16px size without a visible label (`--ui-target-min-size: 0px`, as in the original, which sets no minimum target size), the hard shadow on dialogs and menus, the 1.75 line height of Tailwind prose in rich text, and 36px and 44px small and large controls.",
} satisfies Change
