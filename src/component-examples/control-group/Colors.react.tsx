import { Button, ControlGroup } from "opui-css/react"

export default function Colors() {
  return (
    <>
      <ControlGroup color="critical" variant="filled">
        <Button>Critical</Button>
        <Button>Critical</Button>
        <Button>Critical</Button>
      </ControlGroup>

      <ControlGroup color="primary" variant="filled">
        <Button>Primary</Button>
        <Button>Primary</Button>
        <Button>Primary</Button>
      </ControlGroup>
    </>
  )
}
