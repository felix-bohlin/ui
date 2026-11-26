import { Switch } from "opui-css/react"

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
