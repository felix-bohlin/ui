import { Button, ButtonGroup } from "opui-css/react"

export default function WithIconsCode() {
  return (
    <>
      <ButtonGroup variant="outlined">
        <Button aria-label="OK">
          <svg aria-hidden="true">{/* */}</svg>
        </Button>
        <Button>Maybe</Button>
        <Button aria-label="No">
          <svg aria-hidden="true">{/* */}</svg>
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined">
        <Button>
          <svg aria-hidden="true">{/* */}</svg>
          <span className="ui-text">OK</span>
        </Button>
        <Button>
          <svg aria-hidden="true">{/* */}</svg>
          <span className="ui-text">Maybe</span>
        </Button>
        <Button>
          <svg aria-hidden="true">{/* */}</svg>
          <span className="ui-text">No</span>
        </Button>
      </ButtonGroup>
    </>
  )
}
