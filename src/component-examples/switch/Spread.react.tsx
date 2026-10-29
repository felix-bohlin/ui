import { Switch } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Switch
        endText="Receive alerts when someone mentions you."
        name="switch-spread"
        spread
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
        endText="Turn this on to continue."
      >
        Invalid Switch
      </Switch>
    </>
  )
}
