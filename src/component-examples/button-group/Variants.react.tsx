import { Button, ButtonGroup } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ButtonGroup>
        <Button>Text</Button>
        <Button>Text</Button>
        <Button href="#">Text</Button>
      </ButtonGroup>

      <ButtonGroup variant="outlined">
        <Button>Outlined</Button>
        <Button>Outlined</Button>
        <Button href="#">Outlined</Button>
      </ButtonGroup>

      <ButtonGroup variant="tonal">
        <Button>Tonal</Button>
        <Button>Tonal</Button>
        <Button href="#">Tonal</Button>
      </ButtonGroup>

      <ButtonGroup variant="filled">
        <Button>Filled</Button>
        <Button>Filled</Button>
        <Button href="#">Filled</Button>
      </ButtonGroup>
    </>
  )
}
