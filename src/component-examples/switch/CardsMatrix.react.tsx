import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="switch-cards-end" orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="A summary every morning."
            spread
            value="email"
          >
            Email
          </Switch>
          <Switch
            card
            endText="On this device only."
            spread
            value="push"
            variant="elevated"
          >
            Push
          </Switch>
          <Switch
            card
            endText="For security alerts only."
            spread
            value="sms"
            variant="tonal"
          >
            SMS
          </Switch>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Privacy</FieldLegend>
        <FieldGroup name="switch-cards-start" orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="Others see when you're active."
            value="status"
          >
            Online status
          </Switch>
          <Switch
            card
            endText="Others see when you've read a message."
            value="receipts"
            variant="elevated"
          >
            Read receipts
          </Switch>
          <Switch
            card
            endText="People can find you by email."
            value="search"
            variant="tonal"
          >
            Profile search
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
