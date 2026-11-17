import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`--ui-field-border-color` is a 50% mix of the text color into the page (3:1 or more) instead of `--ui-border-color`, so fields, checkboxes, radios, switches and the range track have a visible boundary without more contrast. Inside filled surfaces it mixes into `--ui-surface-filled` the same way. The example themes keep their own.",
} satisfies Change
