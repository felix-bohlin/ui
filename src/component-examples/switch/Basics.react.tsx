import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch defaultChecked hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch defaultChecked disabled hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch disabled hideLabel name="switch-basics">
        Label
      </Switch>
    </>
  )
}
