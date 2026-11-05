/** @jsxImportSource @solidjs/web */
import { Button, ButtonGroup } from "opui-css/solid"

export default function Colors() {
  return (
    <>
      <ButtonGroup color="critical" variant="filled">
        <Button>Critical</Button>
        <Button>Critical</Button>
        <Button>Critical</Button>
      </ButtonGroup>

      <ButtonGroup color="primary" variant="filled">
        <Button>Primary</Button>
        <Button>Primary</Button>
        <Button>Primary</Button>
      </ButtonGroup>
    </>
  )
}
