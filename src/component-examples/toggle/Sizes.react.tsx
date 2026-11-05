import { ToggleButton, ToggleGroup } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <ToggleButton size="x-small">X-small</ToggleButton>
        <ToggleButton size="small">Small</ToggleButton>
        <ToggleButton>Medium</ToggleButton>
        <ToggleButton size="large">Large</ToggleButton>
      </div>
      <ToggleGroup aria-label="View" name="toggle-sizes-x-small" size="x-small">
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
      <ToggleGroup aria-label="View" name="toggle-sizes-small" size="small">
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
      <ToggleGroup aria-label="View" name="toggle-sizes-medium">
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
      <ToggleGroup aria-label="View" name="toggle-sizes-large" size="large">
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
    </>
  )
}
