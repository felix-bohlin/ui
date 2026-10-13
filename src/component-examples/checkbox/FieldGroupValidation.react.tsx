import {
  Checkbox,
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
          <Checkbox defaultChecked error>
            Checkbox 1
          </Checkbox>
          <Checkbox error>Checkbox 2</Checkbox>
          <Checkbox error>Checkbox 3</Checkbox>
        </FieldGroup>
        <span className="ui-end-text">Something went wrong!</span>
      </FieldSet>
    </Form>
  )
}
