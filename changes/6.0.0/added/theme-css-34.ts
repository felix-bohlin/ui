import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-tabs-accent`, the color of the selected `Tabs` label and of the indicator with `.ui-line` (`--ui-text-strong` when unset). m3 sets `--ui-primary-text`.",
} satisfies Change
