import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch name="switch-variants" defaultChecked hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" defaultChecked disabled hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
