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
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="checkbox-cards-start" orientation="horizontal">
          <Checkbox
            value="outlined"
            defaultChecked
            card
            endText="The default surface."
          >
            Outlined
          </Checkbox>
          <Checkbox
            value="tonal"
            card
            variant="tonal"
            endText="A tinted surface."
          >
            Tonal
          </Checkbox>
          <Checkbox
            value="elevated"
            card
            variant="elevated"
            endText="A raised surface."
          >
            Elevated
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
