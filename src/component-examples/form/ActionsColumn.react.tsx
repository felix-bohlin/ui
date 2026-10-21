import { Button, FieldGroup } from "opui-css/react"

export default function ActionsColumn() {
  return (
    <FieldGroup direction="column">
      <Button>Save draft</Button>
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  )
}
