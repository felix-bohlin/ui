/** @jsxImportSource @solidjs/web */
import { Rating } from "opui-css/solid"

export default function Disabled() {
  return (
    <Rating defaultValue={2} disabled label="Your rating" name="disabled" />
  )
}
