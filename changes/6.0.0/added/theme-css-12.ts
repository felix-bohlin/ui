import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds field text tokens: `--ui-field-label-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-helper-text-color`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height` and `--ui-field-required-text-color`, read by `Checkbox`, `Form`, `Radio`, `Range`, `Switch` and `TextField`.",
} satisfies Change
