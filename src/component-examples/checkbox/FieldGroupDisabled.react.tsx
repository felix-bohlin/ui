import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Newsletter topics</FieldLegend>
        <FieldGroup name="checkbox-group-disabled" orientation="horizontal">
          <Checkbox defaultChecked>Product updates</Checkbox>
          <Checkbox>Events</Checkbox>
          <Checkbox>Offers</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
