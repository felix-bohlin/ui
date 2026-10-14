import { Switch } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked hideLabel>
          x-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked hideLabel>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked hideLabel>
          Default
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked hideLabel>
          Large
        </Switch>
      </div>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked>
          x-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked>
          Default
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked>
          Large
        </Switch>
      </div>
    </>
  )
}
