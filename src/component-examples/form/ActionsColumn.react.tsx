import { Button, FieldGroup } from "opui-css/react"

export default function ActionsColumn() {
  return (
    <FieldGroup orientation="vertical">
      <Button>Save draft</Button>
      <Button variant="filled">Publish</Button>
    </FieldGroup>
  )
}
