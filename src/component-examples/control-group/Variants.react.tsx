import { Button, ControlGroup } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ControlGroup aria-label="Edit history">
        <Button>Undo</Button>
        <Button>Redo</Button>
        <Button href="#">History</Button>
      </ControlGroup>

      <ControlGroup aria-label="Edit history" variant="outlined">
        <Button>Undo</Button>
        <Button>Redo</Button>
        <Button href="#">History</Button>
      </ControlGroup>

      <ControlGroup aria-label="Edit history" variant="tonal">
        <Button>Undo</Button>
        <Button>Redo</Button>
        <Button href="#">History</Button>
      </ControlGroup>

      <ControlGroup aria-label="Edit history" variant="filled">
        <Button>Undo</Button>
        <Button>Redo</Button>
        <Button href="#">History</Button>
      </ControlGroup>
    </>
  )
}
