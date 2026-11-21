/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Alphanumeric() {
  return (
    <OneTimeCode for="one-time-code-alphanumeric-1" label="Recovery code">
      <input
        autocapitalize="characters"
        autocomplete="one-time-code"
        id="one-time-code-alphanumeric-1"
        maxlength="6"
        name="recovery-code"
        pattern="[A-Za-z0-9]{6}"
        spellcheck="false"
        defaultValue="k7q"
      />
    </OneTimeCode>
  )
}
