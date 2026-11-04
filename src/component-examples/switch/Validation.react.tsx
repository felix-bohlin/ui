import { Switch } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-validation" required>
          Default
        </Switch>
        <Switch name="switch-validation" orientation="vertical" required>
          Stack
        </Switch>
      </div>

      <div className="example-row">
        <Switch
          defaultChecked
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
