import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet data-invalid>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="field-group-validation-1-astro">
          <Radio checked>Radio 1</Radio>
          <Radio>Radio 2</Radio>
          <Radio>Radio 3</Radio>
        </FieldGroup>
        <span class="ui-end-text">Something went wrong!</span>
      </FieldSet>
    </Form>
  )
}
