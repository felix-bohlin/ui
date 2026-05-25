import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleGroup name="align-start" align="start">
        <ToggleButton value="a">Start A</ToggleButton>
        <ToggleButton value="b">Start B</ToggleButton>
      </ToggleGroup>
      <ToggleGroup name="align-end" align="end">
        <ToggleButton value="a">End A</ToggleButton>
        <ToggleButton value="b">End B</ToggleButton>
      </ToggleGroup>
    </>
  )
}
