import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function CardsStart() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Add-ons</FieldLegend>
        <FieldGroup name="checkbox-cards-start">
          <Checkbox
            value="support"
            defaultChecked
            card
            endText="Answers within a day."
          >
            Priority support
          </Checkbox>
          <Checkbox value="storage" card endText="Another 100 GB.">
            Extra storage
          </Checkbox>
          <Checkbox
            value="domain"
            disabled
            card
            endText="Not available on this plan."
          >
            Custom domain
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
