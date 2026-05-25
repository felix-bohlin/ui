import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch size="small" checked name="switch">Small</Switch>
      <Switch checked name="switch">Default</Switch>
      <Switch size="large" checked name="switch">Large</Switch>
    </>
  )
}
