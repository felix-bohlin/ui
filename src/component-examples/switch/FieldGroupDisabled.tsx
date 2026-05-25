import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled</FieldLegend>
        <FieldGroup name="switch-disabled">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
