import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-field-group-validation">
          <Switch error>Switch 1</Switch>
          <Switch error>Switch 2</Switch>
          <Switch error>Switch 3</Switch>
        </FieldGroup>
        <span className="ui-end-text">Something went wrong!</span>
      </FieldSet>
    </Form>
  )
}
