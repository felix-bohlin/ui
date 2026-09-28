import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch endText="Supporting text">Default</Switch>
      <Switch stack endText="Supporting text">
        Stack
      </Switch>
    </>
  )
}
