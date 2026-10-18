import { Button } from "opui-css/react"

export default function Cluster() {
  return (
    <div className="ui-cluster">
      <Button color="primary" variant="filled">
        Save
      </Button>
      <Button variant="outlined">Preview</Button>
      <Button variant="outlined">Share</Button>
      <Button>Cancel</Button>
    </div>
  )
}
