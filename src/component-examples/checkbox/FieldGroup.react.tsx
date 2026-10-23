import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-group">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
