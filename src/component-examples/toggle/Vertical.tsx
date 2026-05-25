import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleGroup name="vertical" direction="vertical">
      <ToggleButton value="top">Top</ToggleButton>
      <ToggleButton value="middle">Middle</ToggleButton>
      <ToggleButton value="bottom">Bottom</ToggleButton>
    </ToggleGroup>
  )
}
