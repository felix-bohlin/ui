import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Switch small checked hideLabel>
          Small
        </Switch>
        <Switch checked hideLabel>
          Default
        </Switch>
      </div>
      <div class="example-row">
        <Switch small checked>
          Small
        </Switch>
        <Switch checked>Default</Switch>
      </div>
    </>
  )
}
