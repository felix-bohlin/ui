import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsStart() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="switch-cards-start">
          <Switch
            value="email"
            defaultChecked
            card
            endText="A summary of each day."
          >
            Email
          </Switch>
          <Switch value="push" card endText="Right when something happens.">
            Push
          </Switch>
          <Switch value="digest" card endText="Every Monday morning.">
            Weekly digest
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
