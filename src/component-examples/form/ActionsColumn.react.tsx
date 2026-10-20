import { Button, FieldGroup } from "opui-css/react"

export default function ActionsColumn() {
  return (
    <FieldGroup direction="column">
      <Button variant="filled">Publish</Button>
      <Button>Save draft</Button>
    </FieldGroup>
  )
}
