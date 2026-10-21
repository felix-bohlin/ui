import { Button } from "opui-css/react"

export default function Buttons() {
  return (
    <>
      <div className="example-row">
        <Button aria-busy="true" variant="filled">
          Filled
        </Button>
        <Button aria-busy="true" disabled variant="outlined">
          Outlined
        </Button>
        <Button aria-busy="true">Text</Button>
      </div>

      <div className="example-row">
        <Button aria-busy="true" variant="filled">
          <span className="ui-sr-only">Filled</span>
        </Button>
        <Button aria-busy="true" disabled variant="outlined">
          <span className="ui-sr-only">Outlined</span>
        </Button>
        <Button aria-busy="true">
          <span className="ui-sr-only">Text</span>
        </Button>
      </div>
    </>
  )
}
