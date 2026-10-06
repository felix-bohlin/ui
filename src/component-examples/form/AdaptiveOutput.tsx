import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form as="div">
      <FieldSet aria-labelledby="delivery-legend" as="div">
        <FieldLegend as="p" id="delivery-legend">
          Delivery
        </FieldLegend>
        <FieldDescription>Rendered as div and p elements.</FieldDescription>
      </FieldSet>
    </Form>
  )
}
