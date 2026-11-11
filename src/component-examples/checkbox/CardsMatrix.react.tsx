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
        <FieldLegend>Add-ons</FieldLegend>
        <FieldGroup name="checkbox-cards-end" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="€8 per month"
            spread
            value="support"
          >
            Priority support
          </Checkbox>
          <Checkbox
            card
            endText="€4 per month"
            spread
            value="storage"
            variant="elevated"
          >
            Extra storage
          </Checkbox>
          <Checkbox
            card
            endText="€6 per month"
            spread
            value="audit-log"
            variant="tonal"
          >
            Audit log
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Email reports</FieldLegend>
        <FieldGroup name="checkbox-cards-start" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="Every Monday morning."
            value="weekly"
          >
            Weekly summary
          </Checkbox>
          <Checkbox
            card
            endText="At 80% of your plan."
            value="usage"
            variant="elevated"
          >
            Usage alerts
          </Checkbox>
          <Checkbox
            card
            endText="After each payment."
            value="invoices"
            variant="tonal"
          >
            Invoices
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
