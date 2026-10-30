import { Switch } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Switch defaultChecked hideLabel name="switch-sizes" size="x-small">
          X-small
        </Switch>
        <Switch defaultChecked hideLabel name="switch-sizes" size="small">
          Small
        </Switch>
        <Switch defaultChecked hideLabel name="switch-sizes">
          Medium
        </Switch>
        <Switch defaultChecked hideLabel name="switch-sizes" size="large">
          Large
        </Switch>
      </div>
      <div className="example-row">
        <Switch defaultChecked name="switch-sizes" size="x-small">
          X-small
        </Switch>
        <Switch defaultChecked name="switch-sizes" size="small">
          Small
        </Switch>
        <Switch defaultChecked name="switch-sizes">
          Medium
        </Switch>
        <Switch defaultChecked name="switch-sizes" size="large">
          Large
        </Switch>
      </div>
    </>
  )
}
