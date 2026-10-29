import { Button } from "opui-css/react"

export default function Align() {
  return (
    <div className="ui-layout-column ui-large">
      <div className="ui-layout-column ui-x-small ui-align-center">
        <h3 className="ui-h4">Plans for every team</h3>
        <p>Start free and upgrade when you grow.</p>
      </div>
      <div className="ui-layout-row ui-align-end">
        <Button>Cancel</Button>
        <Button variant="filled">Save</Button>
      </div>
    </div>
  )
}
