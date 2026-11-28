import { OneTimeCode } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <OneTimeCode
        htmlFor="one-time-code-sizes-1"
        label="X-small"
        size="x-small"
      >
        <input
          autoComplete="one-time-code"
          id="one-time-code-sizes-1"
          inputMode="numeric"
          maxLength={6}
          name="code-x-small"
          pattern="[0-9]{6}"
        />
      </OneTimeCode>
      <OneTimeCode htmlFor="one-time-code-sizes-2" label="Small" size="small">
        <input
          autoComplete="one-time-code"
          id="one-time-code-sizes-2"
          inputMode="numeric"
          maxLength={6}
          name="code-small"
          pattern="[0-9]{6}"
        />
      </OneTimeCode>
      <OneTimeCode htmlFor="one-time-code-sizes-3" label="Medium">
        <input
          autoComplete="one-time-code"
          id="one-time-code-sizes-3"
          inputMode="numeric"
          maxLength={6}
          name="code-medium"
          pattern="[0-9]{6}"
        />
      </OneTimeCode>
      <OneTimeCode htmlFor="one-time-code-sizes-4" label="Large" size="large">
        <input
          autoComplete="one-time-code"
          id="one-time-code-sizes-4"
          inputMode="numeric"
          maxLength={6}
          name="code-large"
          pattern="[0-9]{6}"
        />
      </OneTimeCode>
    </>
  )
}
