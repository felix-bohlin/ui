/** @jsxImportSource @solidjs/web */
import { Button } from "opui-css/solid"

export default function Spread() {
  return (
    <div class="ui-layout-row ui-spread">
      <hgroup class="ui-hgroup">
        <p>Projects</p>
        <h3 class="ui-h4">Website relaunch</h3>
      </hgroup>
      <div class="ui-layout-row ui-small">
        <Button variant="outlined">Share</Button>
        <Button color="primary" variant="filled">
          New task
        </Button>
      </div>
    </div>
  )
}
