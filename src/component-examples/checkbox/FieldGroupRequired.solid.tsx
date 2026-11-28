/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupRequired() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Agreements</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Checkbox name="checkbox-group-required" required>
            Terms of service
          </Checkbox>
          <Checkbox name="checkbox-group-required" required>
            Privacy policy
          </Checkbox>
          <Checkbox name="checkbox-group-required" required>
            Data processing
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
