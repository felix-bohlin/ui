import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button>Text</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>Disabled</Button>
        <Button variant="outlined" href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="tonal">Tonal</Button>
        <Button variant="tonal" disabled>Disabled</Button>
        <Button variant="tonal" href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="filled">Filled</Button>
        <Button variant="filled" disabled>Disabled</Button>
        <Button variant="filled" href="#">Link</Button>
      </div>
    </>
  )
}
