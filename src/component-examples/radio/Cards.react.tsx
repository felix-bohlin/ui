import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function Cards() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-cards">
          <Radio
            value="starter"
            defaultChecked
            card
            spread
            endText="For one person."
          >
            Starter
          </Radio>
          <Radio
            value="team"
            card
            spread
            endText="Up to ten seats and shared folders."
          >
            Team
          </Radio>
          <Radio
            value="enterprise"
            disabled
            card
            spread
            endText="Talk to sales."
          >
            Enterprise
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
