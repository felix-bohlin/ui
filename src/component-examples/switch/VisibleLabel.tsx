import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch-visible-label">Label</Switch>
      <Switch name="switch-visible-label" disabled>
        Disabled
      </Switch>
      <Switch name="switch-visible-label">
        Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
        ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf
        meatball.
      </Switch>
    </>
  )
}
