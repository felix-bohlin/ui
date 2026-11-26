import { OneTimeCode } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <OneTimeCode label="X-small" name="code-x-small" size="x-small" />
      <OneTimeCode label="Small" name="code-small" size="small" />
      <OneTimeCode label="Medium" name="code-medium" />
      <OneTimeCode label="Large" name="code-large" size="large" />
    </>
  )
}
