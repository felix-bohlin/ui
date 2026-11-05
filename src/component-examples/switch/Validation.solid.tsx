/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <Switch name="switch-validation" required>
          Default
        </Switch>
        <Switch name="switch-validation" orientation="vertical" required>
          Stack
        </Switch>
      </div>

      <div class="example-row">
        <Switch
          checked
          endText="Supporting text"
          error
          name="switch-validation"
        >
          Default
        </Switch>
        <Switch
          endText="Supporting text"
          error
          name="switch-validation"
          orientation="vertical"
        >
          Stack
        </Switch>
      </div>
    </>
  )
}
