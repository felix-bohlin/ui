import { FieldDescription, FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Preferences</FieldLegend>
        <FieldDescription>Configure your preferences.</FieldDescription>
        <FieldGroup name="switch-desc">
          <Switch>Dark mode</Switch>
          <Switch>Notifications</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
