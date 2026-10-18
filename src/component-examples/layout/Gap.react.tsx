import { Button } from "opui-css/react"

export default function Gap() {
  return (
    <div className="ui-flow">
      <div className="ui-cluster ui-x-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-cluster ui-small">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-cluster">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
      <div className="ui-cluster ui-large">
        <Button variant="outlined">One</Button>
        <Button variant="outlined">Two</Button>
        <Button variant="outlined">Three</Button>
      </div>
    </div>
  )
}
