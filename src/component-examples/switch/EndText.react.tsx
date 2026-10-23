import { Switch } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Switch name="switch-end-text" endText="Supporting text">
        Default
      </Switch>
      <Switch
        name="switch-end-text"
        orientation="vertical"
        endText="Supporting text"
      >
        Stack
      </Switch>
    </>
  )
}
