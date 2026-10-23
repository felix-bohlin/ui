import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Spread() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Delivery</FieldLegend>
        <FieldGroup name="radio-spread">
          <Radio
            value="standard"
            defaultChecked
            spread
            endText="Arrives in 3 to 5 days."
          >
            Standard
          </Radio>
          <Radio value="express" spread endText="Arrives tomorrow.">
            Express
          </Radio>
          <Radio
            value="pickup"
            spread
            disabled
            endText="Not available in your area."
          >
            Pickup
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
