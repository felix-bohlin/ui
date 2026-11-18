/** @jsxImportSource @solidjs/web */
import { Button } from "opui-css/solid"

export default function Row() {
  return (
    <div class="ui-layout-row">
      <Button>Cancel</Button>
      <Button variant="outlined">Share</Button>
      <Button variant="outlined">Preview</Button>
      <Button color="primary" variant="filled">
        Save
      </Button>
    </div>
  )
}
