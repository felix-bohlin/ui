/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function LabelPosition() {
  return (
    <>
      <Switch name="switch-label-position">Default</Switch>
      <Switch name="switch-label-position" orientation="vertical">
        Stack
      </Switch>
    </>
  )
}
