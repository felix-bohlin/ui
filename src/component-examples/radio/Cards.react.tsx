import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function Cards() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-cards">
          <Radio value="starter" defaultChecked card endText="For one person.">
            Starter
          </Radio>
          <Radio
            value="team"
            card
            endText="Up to ten seats and shared folders."
          >
            Team
          </Radio>
          <Radio value="enterprise" disabled card endText="Talk to sales.">
            Enterprise
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
