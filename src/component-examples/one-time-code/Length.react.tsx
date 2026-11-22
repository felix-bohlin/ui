import { OneTimeCode } from "opui-css/react"

export default function Length() {
  return (
    <>
      <OneTimeCode htmlFor="one-time-code-length-1" label="PIN">
        <input
          autoComplete="one-time-code"
          id="one-time-code-length-1"
          inputMode="numeric"
          maxLength={4}
          name="pin"
          pattern="[0-9]{4}"
        />
      </OneTimeCode>
      <OneTimeCode grouped htmlFor="one-time-code-length-2" label="Backup code">
        <input
          autoComplete="one-time-code"
          id="one-time-code-length-2"
          inputMode="numeric"
          maxLength={8}
          name="backup-code"
          pattern="[0-9]{8}"
        />
      </OneTimeCode>
    </>
  )
}
