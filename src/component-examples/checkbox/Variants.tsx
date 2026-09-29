import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox checked name="checkbox-variants" hideLabel>
        Checked
      </Checkbox>
      <Checkbox name="checkbox-variants" hideLabel>
        Unchecked
      </Checkbox>
      <Checkbox indeterminate name="checkbox-variants" hideLabel>
        Indeterminate
      </Checkbox>
      <Checkbox disabled name="checkbox-variants" hideLabel>
        Disabled
      </Checkbox>
      <Checkbox checked disabled name="checkbox-variants" hideLabel>
        Checked and disabled
      </Checkbox>
    </>
  )
}
