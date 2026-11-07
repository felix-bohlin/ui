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
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="checkbox-cards-end" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="The default surface."
            spread
            value="outlined"
          >
            Outlined
          </Checkbox>
          <Checkbox
            card
            endText="A tinted surface."
            spread
            value="tonal"
            variant="tonal"
          >
            Tonal
          </Checkbox>
          <Checkbox
            card
            endText="A raised surface."
            spread
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="checkbox-cards-start" orientation="horizontal">
          <Checkbox
            card
            defaultChecked
            endText="The default surface."
            value="outlined"
          >
            Outlined
          </Checkbox>
          <Checkbox
            card
            endText="A tinted surface."
            value="tonal"
            variant="tonal"
          >
            Tonal
          </Checkbox>
          <Checkbox
            card
            endText="A raised surface."
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
