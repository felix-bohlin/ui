/** @jsxImportSource @solidjs/web */
import { Range } from "opui-css/solid"

export default function Validation() {
  return (
    <Range
      endText="Set it to 20 or more to hear alarms."
      error
      label="Alarm volume"
      value="10"
    />
  )
}
