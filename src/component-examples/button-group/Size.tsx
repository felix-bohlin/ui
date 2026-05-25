import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button size="small" variant="outlined">Left</Button>
        <Button size="small" variant="outlined">Middle</Button>
        <Button size="small" variant="outlined">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button size="large" variant="outlined">Left</Button>
        <Button size="large" variant="outlined">Middle</Button>
        <Button size="large" variant="outlined">Right</Button>
      </div>
    </>
  )
}
