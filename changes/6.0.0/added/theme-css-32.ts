import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional field tokens: `--ui-field-bg-color`, the background of `TextField`, `Textarea` and `Select` fields (`--ui-surface` when unset), `--ui-field-padding-inline`, their horizontal padding (`--ui-space-2` when unset) and `--ui-field-padding-inline-large` for `.ui-large` (`--ui-space-3` when unset), and `--ui-field-placeholder-text-color`, the placeholder color (`--ui-text-subtle` when unset).",
} satisfies Change
