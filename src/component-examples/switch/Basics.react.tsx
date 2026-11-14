import { Switch } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Switch defaultChecked hideLabel name="switch-basics" value="wifi">
        Wi-Fi
      </Switch>
      <Switch hideLabel name="switch-basics" value="bluetooth">
        Bluetooth
      </Switch>
      <Switch
        defaultChecked
        disabled
        hideLabel
        name="switch-basics"
        value="location"
      >
        Location
      </Switch>
      <Switch disabled hideLabel name="switch-basics" value="airplane-mode">
        Airplane mode
      </Switch>
    </>
  )
}
