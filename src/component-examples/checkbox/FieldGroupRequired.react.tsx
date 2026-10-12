import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupRequired() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>These are required!</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-required">
          <Checkbox>
            <CheckboxInput required />
            <CheckboxLabel>Checkbox 1</CheckboxLabel>
          </Checkbox>
          <Checkbox>
            <CheckboxInput required />
            <CheckboxLabel>Checkbox 2</CheckboxLabel>
          </Checkbox>
          <Checkbox>
            <CheckboxInput required />
            <CheckboxLabel>Checkbox 3</CheckboxLabel>
          </Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
