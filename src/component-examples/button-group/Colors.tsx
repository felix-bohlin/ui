import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button variant="filled" color="primary">Left</Button>
        <Button variant="filled" color="primary">Middle</Button>
        <Button variant="filled" color="primary">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="tonal" color="critical">Left</Button>
        <Button variant="tonal" color="critical">Middle</Button>
        <Button variant="tonal" color="critical">Right</Button>
      </div>
    </>
  )
}
