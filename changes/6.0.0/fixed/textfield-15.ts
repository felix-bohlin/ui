import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField`, `Select` and `Textarea` look disabled, and a filled field no longer darkens on hover, when a disabled `fieldset` disables the control or it has `aria-disabled="true"`, and a disabled `option` no longer makes a `Select` look disabled. Read-only and `aria-disabled` fields get no hover styles.',
} satisfies Change
