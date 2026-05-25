import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch" checked hideLabel>Checked</Switch>
      <Switch name="switch" hideLabel>Unchecked</Switch>
      <Switch name="switch" disabled hideLabel>Disabled</Switch>
      <Switch name="switch" checked disabled hideLabel>Checked and disabled</Switch>
    </>
  )
}
