import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <div role="group" class="button-group">
      <Button variant="outlined">Left</Button>
      <Button variant="outlined" disabled>Middle</Button>
      <Button variant="outlined">Right</Button>
    </div>
  )
}
