import { Button } from "opui-css/react"

export default function Buttons() {
  return (
    <>
      <div className="example-row">
        <Button aria-busy="true" variant="filled">
          Save
        </Button>
        <Button aria-busy="true" disabled variant="outlined">
          Upload
        </Button>
        <Button aria-busy="true">Send</Button>
      </div>

      <div className="example-row">
        <Button aria-busy="true" variant="filled">
          <span className="ui-sr-only">Save</span>
        </Button>
        <Button aria-busy="true" disabled variant="outlined">
          <span className="ui-sr-only">Upload</span>
        </Button>
        <Button aria-busy="true">
          <span className="ui-sr-only">Send</span>
        </Button>
      </div>
    </>
  )
}
