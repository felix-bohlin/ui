import { Button } from "opui-css/react"

export default function Spread() {
  return (
    <div className="ui-layout-row ui-spread">
      <hgroup className="ui-hgroup">
        <p>Setlists</p>
        <h3 className="ui-h4">Summer tour</h3>
      </hgroup>
      <div className="ui-layout-row ui-small">
        <Button variant="outlined">Share</Button>
        <Button color="primary" variant="filled">
          New song
        </Button>
      </div>
    </div>
  )
}
