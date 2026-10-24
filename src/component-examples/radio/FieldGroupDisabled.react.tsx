import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-disabled">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>One by one</FieldLegend>
        <FieldGroup orientation="horizontal" name="radio-group-disabled-single">
          <Radio value="1" defaultChecked>
            Enabled
          </Radio>
          <Radio value="2" disabled>
            Disabled
          </Radio>
          <Radio value="3" aria-disabled="true">
            Aria-disabled
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
