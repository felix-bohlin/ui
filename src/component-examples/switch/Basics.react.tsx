import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch name="switch-basics" defaultChecked hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" defaultChecked disabled hideLabel>
        Label
      </Switch>
      <Switch name="switch-basics" disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
