import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`themes/shadcn.css` is a shadcn/ui look: the accent tint on hover instead of a fill, the ring color on the border of a focused control, 16px button padding, 32px small and 40px large controls, 8px chips and menus, 10px dialogs, 16px checks with 4px corners that keep their 16px size without a visible label (`--ui-target-min-size: 0px`, as in the original, which sets no minimum target size), a 32px switch with a white thumb, the destructive red, primary-colored tooltips, 16px icons, 500 weight links, 14px helper text, placeholders, descriptions and tab labels in a slightly darker muted gray (`oklch(0.52 0 0)`, so it reads on tonal and checked cards), 12px field padding, 24px card padding, 8px menu item padding, 0.5 disabled opacity, 1.5 line height with the 1.75 of Tailwind prose in rich text, and the Tailwind shadows for selected tabs and scroll edges.",
} satisfies Change
