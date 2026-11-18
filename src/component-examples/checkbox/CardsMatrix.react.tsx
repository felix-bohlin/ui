import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Gold add-ons</FieldLegend>
        <FieldGroup name="checkbox-cards-end" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="€8 per month"
            spread
            value="support"
          >
            Priority bass help
          </Checkbox>
          <Checkbox
            card
            endText="€4 per month"
            spread
            value="storage"
            variant="elevated"
          >
            Extra slap video storage
          </Checkbox>
          <Checkbox
            card
            endText="€6 per month"
            spread
            value="audit-log"
            variant="tonal"
          >
            Gig diary
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Email updates</FieldLegend>
        <FieldGroup name="checkbox-cards-start" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="Every Monday morning."
            value="weekly"
          >
            Weekly jam recap
          </Checkbox>
          <Checkbox
            card
            endText="When your band books a gig."
            value="usage"
            variant="elevated"
          >
            Gig alerts
          </Checkbox>
          <Checkbox
            card
            endText="After each payment."
            value="invoices"
            variant="tonal"
          >
            Gold receipts
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
