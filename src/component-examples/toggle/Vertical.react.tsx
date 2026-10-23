import { ToggleButton, ToggleGroup } from "opui-css/react"

export default function Vertical() {
  return (
    <ToggleGroup selection="single" name="view" orientation="vertical">
      <ToggleButton value="day">Day</ToggleButton>
      <ToggleButton value="week" defaultChecked>
        Week
      </ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>
    </ToggleGroup>
  )
}
