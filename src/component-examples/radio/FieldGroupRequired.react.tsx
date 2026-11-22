import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupRequired() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Account type</FieldLegend>
        <FieldGroup name="radio-group-required" orientation="horizontal">
          <Radio required value="bassist">
            Bassist
          </Radio>
          <Radio required value="band">
            Band
          </Radio>
          <Radio required value="shop">
            Bass shop
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
