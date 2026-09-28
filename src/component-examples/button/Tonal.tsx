import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="tonal">Tonal</Button>
      <Button variant="tonal" disabled>
        Disabled
      </Button>
      <Button variant="tonal" href="#tonal">
        Link
      </Button>
    </>
  )
}
