import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function CardsVariants() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Variants</FieldLegend>
        <FieldGroup name="checkbox-cards-variants" orientation="horizontal">
          <Checkbox
            value="outlined"
            defaultChecked
            card
            spread
            endText="The default surface."
          >
            Outlined
          </Checkbox>
          <Checkbox
            value="tonal"
            card
            variant="tonal"
            spread
            endText="A tinted surface."
          >
            Tonal
          </Checkbox>
          <Checkbox
            value="elevated"
            card
            variant="elevated"
            spread
            endText="A raised surface."
          >
            Elevated
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
