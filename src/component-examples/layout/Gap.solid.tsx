/** @jsxImportSource @solidjs/web */
import { Button } from "opui-css/solid"

export default function Gap() {
  return (
    <div class="ui-layout-column">
      <div class="ui-layout-row ui-gap-x-small">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div class="ui-layout-row ui-gap-small">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div class="ui-layout-row">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
      <div class="ui-layout-row ui-gap-large">
        <Button variant="outlined">Day</Button>
        <Button variant="outlined">Week</Button>
        <Button variant="outlined">Month</Button>
      </div>
    </div>
  )
}
