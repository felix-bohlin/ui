import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch-variants" checked hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" checked disabled hideLabel>
        Label
      </Switch>
      <Switch name="switch-variants" disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
