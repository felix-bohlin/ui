/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function AnotherScreen() {
  return (
    <OneTimeCode
      endText="The code is on your TV, under Settings and Link a device."
      for="one-time-code-another-screen-1"
      label="Code from your TV"
    >
      <input
        aria-describedby="one-time-code-another-screen-1-end-text"
        autocomplete="off"
        id="one-time-code-another-screen-1"
        inputmode="numeric"
        maxlength="6"
        name="code"
        pattern="[0-9]{6}"
        required
      />
    </OneTimeCode>
  )
}
