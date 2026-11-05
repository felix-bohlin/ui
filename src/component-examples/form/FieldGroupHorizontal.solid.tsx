/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupHorizontal() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Checkbox>Email</Checkbox>
          <Checkbox>Push</Checkbox>
          <Checkbox>SMS</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
