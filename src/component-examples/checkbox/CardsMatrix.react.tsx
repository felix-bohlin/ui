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
        <FieldGroup orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="€8 per month"
            name="checkbox-cards-end"
            spread
            value="support"
          >
            Priority bass help
          </Checkbox>
          <Checkbox
            card
            endText="€4 per month"
            name="checkbox-cards-end"
            spread
            value="storage"
            variant="elevated"
          >
            Extra slap video storage
          </Checkbox>
          <Checkbox
            card
            endText="€6 per month"
            name="checkbox-cards-end"
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
        <FieldGroup orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="Every Monday morning."
            name="checkbox-cards-start"
            value="weekly"
          >
            Weekly jam recap
          </Checkbox>
          <Checkbox
            card
            endText="When your band books a gig."
            name="checkbox-cards-start"
            value="usage"
            variant="elevated"
          >
            Gig alerts
          </Checkbox>
          <Checkbox
            card
            endText="After each payment."
            name="checkbox-cards-start"
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
