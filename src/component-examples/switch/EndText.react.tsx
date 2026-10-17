import { Switch } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Switch name="switch-supporting-text" endText="Supporting text">
        Default
      </Switch>
      <Switch name="switch-supporting-text" stack endText="Supporting text">
        Stack
      </Switch>
    </>
  )
}
