import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup>
          <Switch name="switch-group" value="email">
            Email
          </Switch>
          <Switch name="switch-group" value="push">
            Push
          </Switch>
          <Switch name="switch-group" value="sms">
            SMS
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
