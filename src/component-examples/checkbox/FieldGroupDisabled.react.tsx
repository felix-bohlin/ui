import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="checkbox-group-disabled">
          <Checkbox defaultChecked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
