/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Length() {
  return (
    <>
      <OneTimeCode for="one-time-code-length-1" label="PIN">
        <input
          autocomplete="one-time-code"
          id="one-time-code-length-1"
          inputmode="numeric"
          maxlength="4"
          name="pin"
          pattern="[0-9]{4}"
        />
      </OneTimeCode>
      <OneTimeCode for="one-time-code-length-2" grouped label="Backup code">
        <input
          autocomplete="one-time-code"
          id="one-time-code-length-2"
          inputmode="numeric"
          maxlength="8"
          name="backup-code"
          pattern="[0-9]{8}"
        />
      </OneTimeCode>
    </>
  )
}
