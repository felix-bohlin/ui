/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <Checkbox name="checkbox-validation" required>
          I accept the terms
        </Checkbox>
        <Checkbox name="checkbox-validation" orientation="vertical" required>
          I am 18 or older
        </Checkbox>
      </div>
      <div class="example-row">
        <Checkbox
          checked
          endText="Not available on the free plan."
          error
          name="checkbox-validation"
        >
          Daily backups
        </Checkbox>
        <Checkbox
          endText="Accept the terms to continue."
          error
          name="checkbox-validation"
          orientation="vertical"
        >
          I accept the terms
        </Checkbox>
      </div>
    </>
  )
}
