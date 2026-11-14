import { Switch } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-validation" required>
          Two-step login
        </Switch>
        <Switch name="switch-validation" orientation="vertical" required>
          Usage reports
        </Switch>
      </div>

      <div className="example-row">
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
