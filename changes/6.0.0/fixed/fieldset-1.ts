import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Fieldset` no longer overrides the error color of an invalid `Checkbox`, `Radio` or `Switch` end text inside it. Its helper styles only apply to its own end text.",
} satisfies Change
