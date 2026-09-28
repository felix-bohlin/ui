import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>These are required!</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-required-astro">
          <Checkbox required>Checkbox 1</Checkbox>
          <Checkbox required>Checkbox 2</Checkbox>
          <Checkbox required>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
