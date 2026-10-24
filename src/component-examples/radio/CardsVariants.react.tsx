import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsVariants() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Variants</FieldLegend>
        <FieldGroup name="radio-cards-variants" orientation="horizontal">
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
    </Form>
  )
}
