import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Invalid</FieldLegend>
        <FieldGroup name="switch-invalid">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
