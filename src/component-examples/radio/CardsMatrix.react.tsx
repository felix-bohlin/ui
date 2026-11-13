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
            endText="€0 per month, forever"
            spread
            value="basic"
          >
            Basic
          </Radio>
          <Radio
            card
            endText="€3 per month, shiny badge included"
            spread
            value="gold"
            variant="elevated"
          >
            Gold
          </Radio>
          <Radio
            card
            endText="€5 per month, extra sparkly"
            spread
            value="platinum"
            variant="tonal"
          >
            Platinum
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Billing</FieldLegend>
        <FieldGroup name="radio-cards-start" orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="Cancel any time, no hard feelings."
            value="monthly"
          >
            Monthly
          </Radio>
          <Radio
            card
            endText="Two months free, woohoo."
            value="yearly"
            variant="elevated"
          >
            Yearly
          </Radio>
          <Radio
            card
            endText="Pay in coins after your next gig."
            value="gig-money"
            variant="tonal"
          >
            Gig money
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
