import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Preferences</FieldLegend>
        <FieldGroup name="switch-group">
          <Switch>Dark mode</Switch>
          <Switch>Notifications</Switch>
          <Switch>Auto-save</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
