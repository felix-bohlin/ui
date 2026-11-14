import { Switch } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Switch
        endText="Receive alerts when someone mentions you."
        name="switch-spread"
        spread
        value="notifications"
      >
        Notifications
      </Switch>

      <Switch
        endText="Your organization requires it for admins."
        name="switch-spread"
        required
        spread
        value="two-step-login"
      >
        Two-step login
      </Switch>

      <Switch
        disabled
        endText="Turned off by your administrator."
        name="switch-spread"
        spread
        value="location"
      >
        Location access
      </Switch>

      <Switch
        endText="Sync needs cloud backup. Turn it on to continue."
        error
        name="switch-spread"
        spread
        value="backup"
      >
        Cloud backup
      </Switch>
    </>
  )
}
