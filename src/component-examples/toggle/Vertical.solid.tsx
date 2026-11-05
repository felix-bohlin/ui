/** @jsxImportSource @solidjs/web */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Vertical() {
  return (
    <ToggleGroup aria-label="View" name="view" orientation="vertical">
      <ToggleButton value="day">Day</ToggleButton>
      <ToggleButton checked value="week">
        Week
      </ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>
    </ToggleGroup>
  )
}
