import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="A summary every morning."
            name="switch-cards-end"
            spread
            value="email"
          >
            Email
          </Switch>
          <Switch
            card
            endText="On this device only."
            name="switch-cards-end"
            spread
            value="push"
            variant="elevated"
          >
            Push
          </Switch>
          <Switch
            card
            endText="For security alerts only."
            name="switch-cards-end"
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
        <FieldGroup orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="Others see when you're active."
            name="switch-cards-start"
            value="status"
          >
            Online status
          </Switch>
          <Switch
            card
            endText="Others see when you've read a message."
            name="switch-cards-start"
            value="receipts"
            variant="elevated"
          >
            Read receipts
          </Switch>
          <Switch
            card
            endText="People can find you by email."
            name="switch-cards-start"
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
