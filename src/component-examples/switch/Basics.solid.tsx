/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function Basics() {
  return (
    <>
      <Switch checked hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch checked disabled hideLabel name="switch-basics">
        Label
      </Switch>
      <Switch disabled hideLabel name="switch-basics">
        Label
      </Switch>
    </>
  )
}
