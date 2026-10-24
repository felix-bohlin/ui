import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="radio-cards-end" orientation="horizontal">
          <Radio
            value="outlined"
            defaultChecked
            card
            spread
            endText="The default surface."
          >
            Outlined
          </Radio>
          <Radio
            value="tonal"
            card
            variant="tonal"
            spread
            endText="A tinted surface."
          >
            Tonal
          </Radio>
          <Radio
            value="elevated"
            card
            variant="elevated"
            spread
            endText="A raised surface."
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="radio-cards-start" orientation="horizontal">
          <Radio
            value="outlined"
            defaultChecked
            card
            endText="The default surface."
          >
            Outlined
          </Radio>
          <Radio value="tonal" card variant="tonal" endText="A tinted surface.">
            Tonal
          </Radio>
          <Radio
            value="elevated"
            card
            variant="elevated"
            endText="A raised surface."
          >
            Elevated
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
