/** @jsxImportSource @solidjs/web */
import { Switch } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Switch endText="Supporting text" name="switch-end-text">
        Default
      </Switch>
      <Switch
        endText="Supporting text"
        name="switch-end-text"
        orientation="vertical"
      >
        Stack
      </Switch>
    </>
  )
}
