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
      <FieldSet disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="checkbox-group-disabled-astro">
          <Checkbox checked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
