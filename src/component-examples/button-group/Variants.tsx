import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="outlined">Left</Button>
        <Button variant="outlined">Middle</Button>
        <Button variant="outlined">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="tonal">Left</Button>
        <Button variant="tonal">Middle</Button>
        <Button variant="tonal">Right</Button>
      </div>
    </>
  )
}
