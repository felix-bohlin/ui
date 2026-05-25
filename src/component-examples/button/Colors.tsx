import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button variant="filled" color="primary">Primary</Button>
        <Button variant="tonal" color="primary">Primary</Button>
        <Button variant="outlined" color="primary">Primary</Button>
      </div>
      <div class="example-row">
        <Button variant="filled" color="critical">Critical</Button>
        <Button variant="tonal" color="critical">Critical</Button>
        <Button variant="outlined" color="critical">Critical</Button>
      </div>
    </>
  )
}
