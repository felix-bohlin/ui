/** @jsxImportSource @solidjs/web */
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/solid"

export default function Spread() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Delivery</FieldLegend>
        <FieldGroup name="radio-spread">
          <Radio
            checked
            endText="Arrives in 3 to 5 days."
            spread
            value="standard"
          >
            Standard
          </Radio>
          <Radio endText="Arrives tomorrow." spread value="express">
            Express
          </Radio>
          <Radio
            disabled
            endText="Not available in your area."
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
