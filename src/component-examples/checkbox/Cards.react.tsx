import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function Cards() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Add-ons</FieldLegend>
        <FieldGroup name="checkbox-cards">
          <Checkbox
            value="support"
            defaultChecked
            card
            spread
            endText="Answers within a day."
          >
            Priority support
          </Checkbox>
          <Checkbox value="storage" card spread endText="Another 100 GB.">
            Extra storage
          </Checkbox>
          <Checkbox
            value="domain"
            disabled
            card
            spread
            endText="Not available on this plan."
          >
            Custom domain
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
