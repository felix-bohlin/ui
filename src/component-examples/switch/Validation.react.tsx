import { Switch } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row ui-spacious">
        <Switch name="switch-validation" required>
          Default
        </Switch>
        <Switch name="switch-validation" required stack>
          Stack
        </Switch>
      </div>

      <div className="example-row ui-spacious">
        <Switch name="switch-validation" error endText="Supporting text">
          Default
        </Switch>
        <Switch name="switch-validation" error stack endText="Supporting text">
          Stack
        </Switch>
      </div>
    </>
  )
}
