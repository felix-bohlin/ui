/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Checkbox defaultChecked name="checkbox-group-disabled">
            Bassbook news
          </Checkbox>
          <Checkbox name="checkbox-group-disabled">Events</Checkbox>
          <Checkbox name="checkbox-group-disabled">Gear deals</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
