import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="switch-h">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
