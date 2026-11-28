import { Switch } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Switch endText="A summary every morning." name="switch-end-text">
        Daily digest
      </Switch>
      <Switch
        endText="Only when someone mentions you."
        name="switch-end-text"
        orientation="vertical"
      >
        Mentions
      </Switch>
    </>
  )
}
