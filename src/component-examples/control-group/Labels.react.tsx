import { Button, ControlGroup, TextField } from "opui-css/react"

export default function Labels() {
  return (
    <>
      <ControlGroup variant="outlined">
        <TextField
          aria-describedby="control-group-labels-1"
          defaultValue="SPRING10"
          label="Discount code"
          name="discount"
        />
        <Button>Apply</Button>
      </ControlGroup>
      <p id="control-group-labels-1">One code per order.</p>
    </>
  )
}
