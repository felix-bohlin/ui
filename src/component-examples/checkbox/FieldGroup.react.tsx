import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-group">
          <Checkbox>
            <CheckboxInput defaultChecked />
            <CheckboxLabel>Checkbox 1</CheckboxLabel>
          </Checkbox>
          <Checkbox>
            <CheckboxInput />
            <CheckboxLabel>Checkbox 2</CheckboxLabel>
          </Checkbox>
          <Checkbox>
            <CheckboxInput />
            <CheckboxLabel>Checkbox 3</CheckboxLabel>
          </Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
