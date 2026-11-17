import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`IconButton` (`.ui-icon-button`). Use `Button`: an icon-only button is square by default, `round` (`.ui-round`) makes it a circle. The hover halo is gone: icon-only buttons get the button's hover background. The old default size (28px) is `size=\"x-small\"`. The old `small` (20px) has no preset: use `x-small` with `--_size: 1.25rem`. Icons are smaller (`--_icon-size: 1.5rem` matches the old 24px), and the icon color is the button's accent instead of the inherited text color.",
} satisfies Change
