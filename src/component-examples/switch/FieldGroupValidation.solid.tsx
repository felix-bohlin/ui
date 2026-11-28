/** @jsxImportSource @solidjs/web */
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/solid"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="switch-field-group-validation-1-error">
        <FieldLegend>Security alerts</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Switch error name="switch-field-group-validation" value="email">
            Email
          </Switch>
          <Switch error name="switch-field-group-validation" value="push">
            Push
          </Switch>
          <Switch error name="switch-field-group-validation" value="sms">
            SMS
          </Switch>
        </FieldGroup>
        <span class="ui-end-text" id="switch-field-group-validation-1-error">
          Turn on at least one to continue.
        </span>
      </Fieldset>
    </Form>
  )
}
