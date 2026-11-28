import { Button, ControlGroup, Field } from "opui-css/react"

export default function Labels() {
  return (
    <>
      <ControlGroup aria-label="Discount" variant="outlined">
        <Field htmlFor="control-group-labels-2" label="Discount code">
          <input
            aria-describedby="control-group-labels-1"
            id="control-group-labels-2"
            name="discount"
            defaultValue="SPRING10"
          />
        </Field>
        <Button>Apply</Button>
      </ControlGroup>
      <p id="control-group-labels-1">One code per order.</p>
    </>
  )
}
