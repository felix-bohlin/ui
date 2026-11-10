import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-cards-end" orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="€0 per month"
            spread
            value="starter"
          >
            Starter
          </Radio>
          <Radio
            card
            endText="€12 per person per month"
            spread
            value="team"
            variant="elevated"
          >
            Team
          </Radio>
          <Radio
            card
            endText="€24 per person per month"
            spread
            value="business"
            variant="tonal"
          >
            Business
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Billing</FieldLegend>
        <FieldGroup name="radio-cards-start" orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="Cancel at any time."
            value="monthly"
          >
            Monthly
          </Radio>
          <Radio
            card
            endText="Two months free."
            value="yearly"
            variant="elevated"
          >
            Yearly
          </Radio>
          <Radio
            card
            endText="Pay by bank transfer."
            value="invoice"
            variant="tonal"
          >
            Invoice
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
