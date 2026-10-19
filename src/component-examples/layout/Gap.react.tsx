import { Button } from "opui-css/react"

export default function Gap() {
  return (
    <div className="ui-l-column">
      <div className="ui-l-row ui-x-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-l-row ui-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-l-row">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-l-row ui-large">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
    </div>
  )
}
