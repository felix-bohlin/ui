import { Range } from "opui-css/react"

export default function Validation() {
  return (
    <Range
      defaultValue="10"
      endText="Set it to 20 or more to hear alarms."
      error
      label="Alarm volume"
    />
  )
}
