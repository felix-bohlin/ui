import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row ui-spacious">
        <Switch required>Default</Switch>
        <Switch required stack>
          Stack
        </Switch>
      </div>

      <div class="example-row ui-spacious">
        <Switch error endText="Supporting text">
          Default
        </Switch>
        <Switch error stack endText="Supporting text">
          Stack
        </Switch>
      </div>
    </>
  )
}
