import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Toppings</FieldLegend>
        <FieldGroup name="checkbox-group-orientation" orientation="horizontal">
          <Checkbox defaultChecked>Cheese</Checkbox>
          <Checkbox>Mushrooms</Checkbox>
          <Checkbox>Olives</Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
