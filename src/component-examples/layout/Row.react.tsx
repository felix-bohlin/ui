import { Button } from "opui-css/react"

export default function Row() {
  return (
    <div className="ui-layout-row">
      <Button>Cancel</Button>
      <Button variant="outlined">Share</Button>
      <Button variant="outlined">Preview</Button>
      <Button color="primary" variant="filled">
        Save
      </Button>
    </div>
  )
}
