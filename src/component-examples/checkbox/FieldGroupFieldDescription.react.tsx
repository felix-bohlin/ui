import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Field description above fields</FieldDescription>
        <FieldGroup direction="row" name="checkbox-group-field-description-1">
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

      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-field-description-2">
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
        <FieldDescription>Field description below fields</FieldDescription>
      </FieldSet>
    </Form>
  )
}
