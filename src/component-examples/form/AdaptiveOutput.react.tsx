import { FieldDescription, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function AdaptiveOutput() {
  return (
    <Form as="div">
      <Fieldset as="div">
        <FieldLegend as="p">Delivery</FieldLegend>
        <FieldDescription>Choose how your order gets to you.</FieldDescription>
      </Fieldset>
    </Form>
  )
}
