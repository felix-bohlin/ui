import { Button, ControlGroup } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ControlGroup>
        <Button>Transparent</Button>
        <Button>Transparent</Button>
        <Button href="#">Transparent</Button>
      </ControlGroup>

      <ControlGroup variant="outlined">
        <Button>Outlined</Button>
        <Button>Outlined</Button>
        <Button href="#">Outlined</Button>
      </ControlGroup>

      <ControlGroup variant="tonal">
        <Button>Tonal</Button>
        <Button>Tonal</Button>
        <Button href="#">Tonal</Button>
      </ControlGroup>

      <ControlGroup variant="filled">
        <Button>Filled</Button>
        <Button>Filled</Button>
        <Button href="#">Filled</Button>
      </ControlGroup>
    </>
  )
}
