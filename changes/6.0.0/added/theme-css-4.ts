import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-target-min-size` (`24px`, the WCAG 2.5.8 minimum target size), the least width and height of a `Button` in a field's `.ui-start` or `.ui-end`, of a `Checkbox`, `Radio` or `Switch` whose label is hidden and of the `Carousel` markers and input `Rating` stars. It follows neither `--ui-density` nor `--ui-space-scale`.",
} satisfies Change
