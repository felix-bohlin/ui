import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function FieldGroupDisabled() {
  return (
    <Form>
      <Fieldset disabled>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="switch-group-disabled">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
