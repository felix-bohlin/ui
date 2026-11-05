/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <Checkbox name="checkbox-validation" required>
          Default
        </Checkbox>
        <Checkbox name="checkbox-validation" orientation="vertical" required>
          Stack
        </Checkbox>
      </div>
      <div class="example-row">
        <Checkbox
          checked
          endText="Check yourself"
          error
          name="checkbox-validation"
        >
          Default
        </Checkbox>
        <Checkbox
          endText="Before you wreck yourself"
          error
          name="checkbox-validation"
          orientation="vertical"
        >
          Stack
        </Checkbox>
      </div>
    </>
  )
}
