import { Button } from "opui-css/react"

export default function Gap() {
  return (
    <div className="ui-layout-column">
      <div className="ui-layout-row ui-x-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-layout-row ui-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-layout-row">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-layout-row ui-large">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
    </div>
  )
}
