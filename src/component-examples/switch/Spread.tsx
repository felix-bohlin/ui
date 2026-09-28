import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch spread endText="Receive alerts when someone mentions you.">
        Notifications
      </Switch>

      <Switch spread required endText="You must accept this to proceed.">
        Required
      </Switch>

      <Switch spread disabled endText="This switch is disabled.">
        Disabled
      </Switch>

      <Switch spread error endText="There is an error with this switch.">
        Invalid Switch
      </Switch>
    </>
  )
}
