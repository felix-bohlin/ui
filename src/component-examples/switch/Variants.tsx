import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch checked hideLabel>
        Label
      </Switch>
      <Switch hideLabel>Label</Switch>
      <Switch checked disabled hideLabel>
        Label
      </Switch>
      <Switch disabled hideLabel>
        Label
      </Switch>
    </>
  )
}
