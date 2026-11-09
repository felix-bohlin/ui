import { Button, ControlGroup, TextField } from "opui-css/react"

export default function Labels() {
  return (
    <ControlGroup variant="outlined">
      <TextField
        defaultValue="SPRING10"
        label="Discount code"
        name="discount"
      />
      <Button>Apply</Button>
    </ControlGroup>
  )
}
