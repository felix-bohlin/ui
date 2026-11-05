/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="checkbox-group">
          <Checkbox checked>Email</Checkbox>
          <Checkbox>Push</Checkbox>
          <Checkbox>SMS</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
