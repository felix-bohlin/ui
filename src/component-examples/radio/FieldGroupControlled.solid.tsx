/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/solid"

export default function FieldGroupControlled() {
  const [shipping, setShipping] = createSignal("standard")

  return (
    <>
      <Fieldset>
        <FieldLegend>Shipping</FieldLegend>
        <FieldGroup name="radio-controlled">
          <Radio
            checked={shipping() === "standard"}
            onChange={() => setShipping("standard")}
            value="standard"
          >
            Standard
          </Radio>
          <Radio
            checked={shipping() === "express"}
            onChange={() => setShipping("express")}
            value="express"
          >
            Express
          </Radio>
          <Radio
            checked={shipping() === "pickup"}
            onChange={() => setShipping("pickup")}
            value="pickup"
          >
            Pickup
          </Radio>
        </FieldGroup>
      </Fieldset>
      <p class="radio-controlled-text">Selected: {shipping()}</p>
      <Button
        class="radio-controlled-reset"
        onClick={() => setShipping("standard")}
      >
        Reset
      </Button>
    </>
  )
}
