/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function Basics() {
  return (
    <>
      <Switch checked hideLabel name="switch-basics" value="wifi">
        Wi-Fi
      </Switch>
      <Switch hideLabel name="switch-basics" value="bluetooth">
        Bluetooth
      </Switch>
      <Switch checked disabled hideLabel name="switch-basics" value="location">
        Location
      </Switch>
      <Switch disabled hideLabel name="switch-basics" value="airplane-mode">
        Airplane mode
      </Switch>
    </>
  )
}
