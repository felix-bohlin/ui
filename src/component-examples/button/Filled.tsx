import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="filled">Filled</Button>
      <Button variant="filled" disabled>
        Disabled
      </Button>
      <Button variant="filled" href="#filled">
        Link
      </Button>
    </>
  )
}
