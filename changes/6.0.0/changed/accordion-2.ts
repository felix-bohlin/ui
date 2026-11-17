import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` and `Card` with `variant="tonal"` or `variant="elevated"`, and `Dialog`, have a border in the page background color unless a theme sets `--ui-border-color-raised`, so they stay visible on tonal surfaces.',
} satisfies Change
