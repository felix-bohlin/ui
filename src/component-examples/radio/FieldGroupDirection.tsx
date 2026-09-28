import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="fieldset-direction-astro">
          <Radio checked>Radio 1</Radio>
          <Radio>Radio 2</Radio>
          <Radio>Radio 3</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
