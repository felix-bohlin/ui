import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleGroup name="size-small">
        <ToggleButton size="small" value="a">Small A</ToggleButton>
        <ToggleButton size="small" value="b">Small B</ToggleButton>
      </ToggleGroup>
      <ToggleGroup name="size-large">
        <ToggleButton size="large" value="a">Large A</ToggleButton>
        <ToggleButton size="large" value="b">Large B</ToggleButton>
      </ToggleGroup>
    </>
  )
}
