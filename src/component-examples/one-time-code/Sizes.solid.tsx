/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Sizes() {
  return (
    <>
      <OneTimeCode label="Small" name="code-small" size="small" />
      <OneTimeCode label="Default" name="code-default" />
      <OneTimeCode label="Large" name="code-large" size="large" />
    </>
  )
}
