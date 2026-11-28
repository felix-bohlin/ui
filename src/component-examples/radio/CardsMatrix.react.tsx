import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="€0 per month, forever"
            name="radio-cards-end"
            spread
            value="basic"
          >
            Basic
          </Radio>
          <Radio
            card
            endText="€3 per month, shiny badge included"
            name="radio-cards-end"
            spread
            value="gold"
            variant="elevated"
          >
            Gold
          </Radio>
          <Radio
            card
            endText="€5 per month, extra sparkly"
            name="radio-cards-end"
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
        <FieldGroup orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="Cancel any time, no hard feelings."
            name="radio-cards-start"
            value="monthly"
          >
            Monthly
          </Radio>
          <Radio
            card
            endText="Two months free, woohoo."
            name="radio-cards-start"
            value="yearly"
            variant="elevated"
          >
            Yearly
          </Radio>
          <Radio
            card
            endText="Pay in coins after your next gig."
            name="radio-cards-start"
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
