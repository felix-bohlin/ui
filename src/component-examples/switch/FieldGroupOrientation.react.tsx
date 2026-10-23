import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="switch-group-orientation" orientation="horizontal">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
