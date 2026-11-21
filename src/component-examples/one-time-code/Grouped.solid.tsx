/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Grouped() {
  return (
    <OneTimeCode
      for="one-time-code-grouped-1"
      grouped
      label="Verification code"
    >
      <input
        autocomplete="one-time-code"
        id="one-time-code-grouped-1"
        inputmode="numeric"
        maxlength="6"
        name="code"
        pattern="[0-9]{6}"
        required
        defaultValue="482"
      />
    </OneTimeCode>
  )
}
