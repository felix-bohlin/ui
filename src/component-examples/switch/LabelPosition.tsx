import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch labelPosition="start" name="switch">Label start</Switch>
      <Switch name="switch">Label end (default)</Switch>
    </>
  )
}
