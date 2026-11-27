"use client"

import { useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/react"

export default function FieldGroupControlled() {
  const [shipping, setShipping] = useState("standard")

  return (
    <>
      <Fieldset>
        <FieldLegend>Shipping</FieldLegend>
        <FieldGroup>
          <Radio
            checked={shipping === "standard"}
            name="radio-controlled"
            onChange={() => setShipping("standard")}
            value="standard"
          >
            Standard
          </Radio>
          <Radio
            checked={shipping === "express"}
            name="radio-controlled"
            onChange={() => setShipping("express")}
            value="express"
          >
            Express
          </Radio>
          <Radio
            checked={shipping === "pickup"}
            name="radio-controlled"
            onChange={() => setShipping("pickup")}
            value="pickup"
          >
            Pickup
          </Radio>
        </FieldGroup>
      </Fieldset>
      <p className="radio-controlled-text">Selected: {shipping}</p>
      <Button
        className="radio-controlled-reset"
        onClick={() => setShipping("standard")}
      >
        Reset
      </Button>
    </>
  )
}
