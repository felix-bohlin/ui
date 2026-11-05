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
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>How we reach you about your orders.</FieldDescription>
        <FieldGroup
          name="checkbox-group-field-description-1"
          orientation="horizontal"
        >
          <Checkbox checked>Email</Checkbox>
          <Checkbox>Push</Checkbox>
          <Checkbox>SMS</Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup
          name="checkbox-group-field-description-2"
          orientation="horizontal"
        >
          <Checkbox checked>Product updates</Checkbox>
          <Checkbox>Events</Checkbox>
          <Checkbox>Offers</Checkbox>
        </FieldGroup>
        <FieldDescription>
          Change these at any time in your account.
        </FieldDescription>
      </Fieldset>
    </Form>
  )
}
