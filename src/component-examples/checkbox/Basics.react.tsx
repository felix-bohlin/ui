import { Checkbox } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Checkbox defaultChecked hideLabel name="checkbox-basics">
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
      <Checkbox defaultChecked disabled hideLabel name="checkbox-basics">
        Checked and disabled
      </Checkbox>
    </>
  )
}
