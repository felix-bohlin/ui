import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button>
        Text
        <svg>{/* */}</svg>
      </Button>
      <Button variant="outlined">
        Outlined
        <svg>{/* */}</svg>
      </Button>
      <Button variant="tonal">
        Tonal
        <svg>{/* */}</svg>
      </Button>
      <Button variant="filled">
        Filled
        <svg>{/* */}</svg>
      </Button>

      <Button>
        <svg>{/* */}</svg>
        Text
      </Button>
      <Button variant="outlined">
        <svg>{/* */}</svg>
        Outlined
      </Button>
      <Button variant="tonal">
        <svg>{/* */}</svg>
        Tonal
      </Button>
      <Button variant="filled">
        <svg>{/* */}</svg>
        Filled
      </Button>
    </>
  )
}
