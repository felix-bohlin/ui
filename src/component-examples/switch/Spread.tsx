import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch
        name="switch-spread"
        spread
        endText="Receive alerts when someone mentions you."
      >
        Notifications
      </Switch>

      <Switch
        name="switch-spread"
        spread
        required
        endText="You must accept this to proceed."
      >
        Required
      </Switch>

      <Switch
        name="switch-spread"
        spread
        disabled
        endText="This switch is disabled."
      >
        Disabled
      </Switch>

      <Switch
        name="switch-spread"
        spread
        error
        endText="There is an error with this switch."
      >
        Invalid Switch
      </Switch>
    </>
  )
}
