import { Switch } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked hideLabel>
          X-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked hideLabel>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked hideLabel>
          Medium
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked hideLabel>
          Large
        </Switch>
      </div>
      <div className="example-row">
        <Switch name="switch-sizes" size="x-small" defaultChecked>
          X-small
        </Switch>
        <Switch name="switch-sizes" size="small" defaultChecked>
          Small
        </Switch>
        <Switch name="switch-sizes" defaultChecked>
          Medium
        </Switch>
        <Switch name="switch-sizes" size="large" defaultChecked>
          Large
        </Switch>
      </div>
    </>
  )
}
