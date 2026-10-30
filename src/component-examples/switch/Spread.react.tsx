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
        endText="You must accept this to proceed."
        name="switch-spread"
        required
        spread
      >
        Required
      </Switch>

      <Switch
        disabled
        endText="This switch is disabled."
        name="switch-spread"
        spread
      >
        Disabled
      </Switch>

      <Switch
        endText="Turn this on to continue."
        error
        name="switch-spread"
        spread
      >
        Invalid Switch
      </Switch>
    </>
  )
}
