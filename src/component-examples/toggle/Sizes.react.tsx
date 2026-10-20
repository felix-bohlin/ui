import { ToggleButton, ToggleGroup } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <ToggleButton size="x-small">x-small</ToggleButton>
      <ToggleButton size="small">small</ToggleButton>
      <ToggleButton>default</ToggleButton>
      <ToggleButton size="large">large</ToggleButton>
      <ToggleGroup
        aria-label="View"
        name="toggle-sizes"
        selection="single"
        size="small"
      >
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
    </>
  )
}
