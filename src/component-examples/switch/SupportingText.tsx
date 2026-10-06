import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch-supporting-text" endText="Supporting text">
        Default
      </Switch>
      <Switch name="switch-supporting-text" stack endText="Supporting text">
        Stack
      </Switch>
    </>
  )
}
