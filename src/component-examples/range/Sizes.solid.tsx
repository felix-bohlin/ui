/** @jsxImportSource @solidjs/web */
import { Range } from "opui-css/solid"

export default function Sizes() {
  return (
    <>
      <Range label="x-small" size="x-small" />
      <Range label="Small" size="small" />
      <Range label="Medium" />
      <Range label="Large" size="large" />
    </>
  )
}
