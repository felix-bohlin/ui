import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Spread() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Delivery</FieldLegend>
        <FieldGroup>
          <Radio
            defaultChecked
            endText="Arrives in 3 to 5 days."
            name="radio-spread"
            spread
            value="standard"
          >
            Standard
          </Radio>
          <Radio
            endText="Arrives tomorrow."
            name="radio-spread"
            spread
            value="express"
          >
            Express
          </Radio>
          <Radio
            disabled
            endText="Not available in your area."
            name="radio-spread"
            spread
            value="pickup"
          >
            Pickup
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
