import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-validation">
          <Checkbox error>
            <CheckboxInput defaultChecked />
            <CheckboxLabel>Checkbox 1</CheckboxLabel>
          </Checkbox>
          <Checkbox error>
            <CheckboxInput />
            <CheckboxLabel>Checkbox 2</CheckboxLabel>
          </Checkbox>
          <Checkbox error>
            <CheckboxInput />
            <CheckboxLabel>Checkbox 3</CheckboxLabel>
          </Checkbox>
        </FieldGroup>
        <span className="ui-end-text">Something went wrong!</span>
      </FieldSet>
    </Form>
  )
}
