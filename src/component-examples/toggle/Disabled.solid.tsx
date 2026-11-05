/** @jsxImportSource @solidjs/web */
import { ToggleButton } from "opui-css/solid"

export default function Disabled() {
  return (
    <>
      <ToggleButton disabled name="disabled-demo-1">
        Disabled
      </ToggleButton>
      <ToggleButton aria-disabled="true" name="disabled-demo-2">
        Aria-disabled
      </ToggleButton>
    </>
  )
}
