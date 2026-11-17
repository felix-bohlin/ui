import { Switch } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Switch name="switch-label-position">Daily digest</Switch>
      <Switch name="switch-label-position" orientation="vertical">
        Mentions
      </Switch>
    </>
  )
}
