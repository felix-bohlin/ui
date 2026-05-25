import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required</FieldLegend>
        <FieldGroup name="switch-required">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
