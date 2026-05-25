import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleGroup name="text-style">
      <ToggleButton value="bold" aria-label="Bold"><strong>B</strong></ToggleButton>
      <ToggleButton value="italic" aria-label="Italic"><i>I</i></ToggleButton>
      <ToggleButton value="underline" aria-label="Underline"><u>U</u></ToggleButton>
    </ToggleGroup>
  )
}
