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
        <FieldGroup>
          <Checkbox defaultChecked name="checkbox-group">
            Email
          </Checkbox>
          <Checkbox name="checkbox-group">Push</Checkbox>
          <Checkbox name="checkbox-group">SMS</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
