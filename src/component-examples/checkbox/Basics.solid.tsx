/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function Basics() {
  return (
    <>
      <Checkbox checked hideLabel name="checkbox-basics">
        Checked
      </Checkbox>
      <Checkbox hideLabel name="checkbox-basics">
        Unchecked
      </Checkbox>
      <Checkbox hideLabel indeterminate name="checkbox-basics">
        Indeterminate
      </Checkbox>
      <Checkbox disabled hideLabel name="checkbox-basics">
        Disabled
      </Checkbox>
      <Checkbox checked disabled hideLabel name="checkbox-basics">
        Checked and disabled
      </Checkbox>
    </>
  )
}
