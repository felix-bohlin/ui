import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-disabled">
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
