import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` `--ui-focus-ring-color` is black on light surfaces and white on dark ones, by the surface's OKLCH lightness, instead of `var(--ui-primary)`, and the global `:focus-visible` ring and the component rings read it, with `--ui-focus-ring-width`, `--ui-focus-ring-style` and `--ui-focus-ring-offset`. Set `--ui-focus-ring-color: var(--ui-primary)` to keep the old value.",
} satisfies Change
