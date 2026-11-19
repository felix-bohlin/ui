/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <Switch name="switch-validation" required>
          Two-step login
        </Switch>
        <Switch name="switch-validation" orientation="vertical" required>
          Usage reports
        </Switch>
      </div>

      <div class="example-row">
        <Switch
          defaultChecked
          endText="Your organization keeps profiles private. Turn it off."
          error
          name="switch-validation"
        >
          Public profile
        </Switch>
        <Switch
          endText="Sync needs cloud backup. Turn it on to continue."
          error
          name="switch-validation"
          orientation="vertical"
        >
          Cloud backup
        </Switch>
      </div>
    </>
  )
}
