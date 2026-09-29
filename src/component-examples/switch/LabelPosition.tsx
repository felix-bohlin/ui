import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch-label-position">Default</Switch>
      <Switch name="switch-label-position" stack>
        Stack
      </Switch>
    </>
  )
}
