import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio` and `Switch` no longer point `aria-describedby` at the end text, so screen readers don't read it twice. The wrapping `<label>` already makes it part of the name.",
} satisfies Change
