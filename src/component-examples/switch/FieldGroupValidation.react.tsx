import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="switch-field-group-validation-1-error">
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup
          name="switch-field-group-validation"
          orientation="horizontal"
        >
          <Switch error>Switch 1</Switch>
          <Switch error>Switch 2</Switch>
          <Switch error>Switch 3</Switch>
        </FieldGroup>
        <span
          className="ui-end-text"
          id="switch-field-group-validation-1-error"
        >
          Turn on at least one to continue.
        </span>
      </Fieldset>
    </Form>
  )
}
