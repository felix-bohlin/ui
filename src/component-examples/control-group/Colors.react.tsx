import { Button, ControlGroup } from "opui-css/react"

export default function Colors() {
  return (
    <>
      <ControlGroup
        aria-label="Message actions"
        color="critical"
        variant="filled"
      >
        <Button>Archive</Button>
        <Button>Move</Button>
        <Button>Delete</Button>
      </ControlGroup>

      <ControlGroup
        aria-label="Message actions"
        color="primary"
        variant="filled"
      >
        <Button>Archive</Button>
        <Button>Move</Button>
        <Button>Delete</Button>
      </ControlGroup>
    </>
  )
}
