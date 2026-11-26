import { Button } from "opui-css/react"

export default function Row() {
  return (
    <div className="ui-layout-row">
      <Button color="primary" variant="filled">
        Save
      </Button>
      <Button variant="outlined">Preview</Button>
      <Button variant="outlined">Share</Button>
      <Button>Cancel</Button>
    </div>
  )
}
