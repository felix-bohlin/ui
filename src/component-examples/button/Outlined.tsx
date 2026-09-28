import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined" disabled>
        Disabled
      </Button>
      <Button variant="outlined" href="#outlined">
        Link
      </Button>
    </>
  )
}
