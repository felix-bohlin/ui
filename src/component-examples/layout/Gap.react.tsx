import { Button } from "opui-css/react"

export default function Gap() {
  return (
    <div className="ui-layout-column">
      <div className="ui-layout-row ui-gap-x-small">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div className="ui-layout-row ui-gap-small">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div className="ui-layout-row">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div className="ui-layout-row ui-gap-large">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
    </div>
  )
}
