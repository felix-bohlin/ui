import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button`, `Checkbox`, `Chip`, `ControlGroup`, `List`, `Radio`, `Range` and `Switch` match a disabled control with `:disabled` instead of the `[disabled]` attribute, so inside a disabled `fieldset` they look disabled and show no hover or active state, and a `Range` gets the disabled thumb and no hover ring.",
} satisfies Change
