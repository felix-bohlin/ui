import { ToggleButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleButton value="bold" aria-label="Bold"><strong>B</strong></ToggleButton>
      <ToggleButton value="italic" aria-label="Italic" checked><i>I</i></ToggleButton>
      <ToggleButton value="underline" aria-label="Underline"><u>U</u></ToggleButton>
    </>
  )
}
