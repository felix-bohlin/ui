import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button size="small">Small</Button>
        <Button>Default</Button>
        <Button size="large">Large</Button>
      </div>
      <div class="example-row">
        <Button variant="filled" size="small">Small</Button>
        <Button variant="filled">Default</Button>
        <Button variant="filled" size="large">Large</Button>
      </div>
    </>
  )
}
