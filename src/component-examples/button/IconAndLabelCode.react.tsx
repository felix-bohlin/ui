import { Button } from "opui-css/react"

export default function IconAndLabelCode() {
  return (
    <>
      <Button>
        <span className="ui-text">Text</span>
        <svg>{/* */}</svg>
      </Button>
      <Button variant="outlined">
        <span className="ui-text">Outlined</span>
        <svg>{/* */}</svg>
      </Button>
      <Button variant="tonal">
        <span className="ui-text">Tonal</span>
        <svg>{/* */}</svg>
      </Button>
      <Button variant="filled">
        <span className="ui-text">Filled</span>
        <svg>{/* */}</svg>
      </Button>

      <Button>
        <svg>{/* */}</svg>
        <span className="ui-text">Text</span>
      </Button>
      <Button variant="outlined">
        <svg>{/* */}</svg>
        <span className="ui-text">Outlined</span>
      </Button>
      <Button variant="tonal">
        <svg>{/* */}</svg>
        <span className="ui-text">Tonal</span>
      </Button>
      <Button variant="filled">
        <svg>{/* */}</svg>
        <span className="ui-text">Filled</span>
      </Button>
    </>
  )
}
