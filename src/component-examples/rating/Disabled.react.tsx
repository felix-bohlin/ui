import { Rating } from "opui-css/react"

export default function Disabled() {
  return (
    <Rating defaultValue={2} disabled label="Your rating" name="disabled" />
  )
}
