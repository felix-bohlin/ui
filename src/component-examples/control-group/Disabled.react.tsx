import { Button, ControlGroup } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <ControlGroup variant="filled">
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
        <Button>Enabled</Button>
      </ControlGroup>

      <ControlGroup color="primary" variant="filled">
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
        <Button>Enabled</Button>
      </ControlGroup>
    </>
  )
}
