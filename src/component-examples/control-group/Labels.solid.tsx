/** @jsxImportSource @solidjs/web */
import { Button, ControlGroup, TextField } from "opui-css/solid"

export default function Labels() {
  return (
    <>
      <ControlGroup aria-label="Discount" variant="outlined">
        <TextField for="control-group-labels-2" label="Discount code">
          <input
            aria-describedby="control-group-labels-1"
            id="control-group-labels-2"
            name="discount"
            defaultValue="SPRING10"
          />
        </TextField>
        <Button>Apply</Button>
      </ControlGroup>
      <p id="control-group-labels-1">One code per order.</p>
    </>
  )
}
