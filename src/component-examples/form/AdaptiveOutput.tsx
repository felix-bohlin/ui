import { FieldDescription, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form as="div">
      <FieldSet as="div">
        <FieldLegend as="p">Using as prop</FieldLegend>
        <FieldDescription> Renders as div and p elements. </FieldDescription>
      </FieldSet>
    </Form>
  )
}
