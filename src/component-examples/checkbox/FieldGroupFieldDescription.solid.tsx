/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <Fieldset aria-describedby="checkbox-field-group-field-description-1-description">
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription id="checkbox-field-group-field-description-1-description">
          How we tell you a bandmate finally replied.
        </FieldDescription>
        <FieldGroup orientation="horizontal">
          <Checkbox defaultChecked name="checkbox-group-field-description-1">
            Email
          </Checkbox>
          <Checkbox name="checkbox-group-field-description-1">Push</Checkbox>
          <Checkbox name="checkbox-group-field-description-1">SMS</Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset aria-describedby="checkbox-field-group-field-description-2-description">
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Checkbox defaultChecked name="checkbox-group-field-description-2">
            Bassbook news
          </Checkbox>
          <Checkbox name="checkbox-group-field-description-2">Events</Checkbox>
          <Checkbox name="checkbox-group-field-description-2">
            Gear deals
          </Checkbox>
        </FieldGroup>
        <FieldDescription id="checkbox-field-group-field-description-2-description">
          Change these at any time in your account.
        </FieldDescription>
      </Fieldset>
    </Form>
  )
}
