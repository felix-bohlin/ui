import { Button, ButtonGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ButtonGroup size="x-small" variant="outlined">
        <Button>X-small</Button>
        <Button>X-small</Button>
        <Button>X-small</Button>
      </ButtonGroup>

      <ButtonGroup size="small" variant="outlined">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined">
        <Button>Default</Button>
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>

      <ButtonGroup size="large" variant="outlined">
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
    </>
  )
}
