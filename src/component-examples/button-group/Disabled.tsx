import { Button, ButtonGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ButtonGroup variant="filled">
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
        <Button>Enabled</Button>
      </ButtonGroup>

      <ButtonGroup variant="filled" color="primary">
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
        <Button>Enabled</Button>
      </ButtonGroup>
    </>
  )
}
