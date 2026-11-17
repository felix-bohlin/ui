import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-focus-highlight`, the fill of a focused element that highlights instead of showing the ring (`--ui-focus-ring-color` made opaque), and `--ui-on-focus-highlight`, black or white text on it that promises 4.5:1. It switches at OKLCH lightness 0.57, where both reach 4.5:1 on a gray.",
} satisfies Change
