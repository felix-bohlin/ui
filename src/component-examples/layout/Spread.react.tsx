import { Button } from "opui-css/react"

export default function Spread() {
  return (
    <div className="ui-layout-row ui-spread">
      <hgroup className="ui-hgroup">
        <p>Projects</p>
        <h2 className="ui-h4">Website relaunch</h2>
      </hgroup>
      <div className="ui-layout-row ui-small">
        <Button variant="outlined">Share</Button>
        <Button color="primary" variant="filled">
          New task
        </Button>
      </div>
    </div>
  )
}
