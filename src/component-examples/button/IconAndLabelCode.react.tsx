import { Button } from "opui-css/react"

export default function IconAndLabelCode() {
  return (
    <>
      <Button>
        <span className="ui-text">Text</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="outlined">
        <span className="ui-text">Outlined</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="tonal">
        <span className="ui-text">Tonal</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="filled">
        <span className="ui-text">Filled</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>

      <Button>
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Text</span>
      </Button>
      <Button variant="outlined">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Outlined</span>
      </Button>
      <Button variant="tonal">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Tonal</span>
      </Button>
      <Button variant="filled">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Filled</span>
      </Button>
    </>
  )
}
