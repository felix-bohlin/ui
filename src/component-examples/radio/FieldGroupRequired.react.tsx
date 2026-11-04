import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupRequired() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>These are required!</FieldLegend>
        <FieldGroup name="radio-group-required" orientation="horizontal">
          <Radio required value="1">
            Radio 1
          </Radio>
          <Radio required value="2">
            Radio 2
          </Radio>
          <Radio required value="3">
            Radio 3
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
