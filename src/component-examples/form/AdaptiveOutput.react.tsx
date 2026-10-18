import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/react"

export default function AdaptiveOutput() {
  return (
    <Form as="div">
      <FieldSet aria-labelledby="form-adaptive-output-1-legend" as="div">
        <FieldLegend as="p" id="form-adaptive-output-1-legend">
          Delivery
        </FieldLegend>
        <FieldDescription>Rendered as div and p elements.</FieldDescription>
      </FieldSet>
    </Form>
  )
}
