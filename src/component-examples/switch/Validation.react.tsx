import { Switch } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-validation" required>
          Default
        </Switch>
        <Switch name="switch-validation" required orientation="vertical">
          Stack
        </Switch>
      </div>

      <div className="example-row">
        <Switch
          name="switch-validation"
          error
          defaultChecked
          endText="Supporting text"
        >
          Default
        </Switch>
        <Switch
          name="switch-validation"
          error
          orientation="vertical"
          endText="Supporting text"
        >
          Stack
        </Switch>
      </div>
    </>
  )
}
