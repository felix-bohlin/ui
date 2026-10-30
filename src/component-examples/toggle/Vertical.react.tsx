import { ToggleButton, ToggleGroup } from "opui-css/react"

export default function Vertical() {
  return (
    <ToggleGroup name="view" orientation="vertical">
      <ToggleButton value="day">Day</ToggleButton>
      <ToggleButton defaultChecked value="week">
        Week
      </ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>
    </ToggleGroup>
  )
}
