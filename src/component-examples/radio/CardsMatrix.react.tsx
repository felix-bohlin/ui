import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="radio-cards-end" orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="The default surface."
            spread
            value="outlined"
          >
            Outlined
          </Radio>
          <Radio
            card
            endText="A tinted surface."
            spread
            value="tonal"
            variant="tonal"
          >
            Tonal
          </Radio>
          <Radio
            card
            endText="A raised surface."
            spread
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="radio-cards-start" orientation="horizontal">
          <Radio
            card
            defaultChecked
            endText="The default surface."
            value="outlined"
          >
            Outlined
          </Radio>
          <Radio card endText="A tinted surface." value="tonal" variant="tonal">
            Tonal
          </Radio>
          <Radio
            card
            endText="A raised surface."
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
