import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function Cards() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="switch-cards">
          <Switch
            value="email"
            defaultChecked
            card
            spread
            endText="A summary of each day."
          >
            Email
          </Switch>
          <Switch
            value="push"
            card
            spread
            endText="Right when something happens."
          >
            Push
          </Switch>
          <Switch value="digest" card spread endText="Every Monday morning.">
            Weekly digest
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
