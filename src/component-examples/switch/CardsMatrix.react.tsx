import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="switch-cards-end" orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="The default surface."
            spread
            value="outlined"
          >
            Outlined
          </Switch>
          <Switch
            card
            endText="A tinted surface."
            spread
            value="tonal"
            variant="tonal"
          >
            Tonal
          </Switch>
          <Switch
            card
            endText="A raised surface."
            spread
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Switch>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="switch-cards-start" orientation="horizontal">
          <Switch
            card
            defaultChecked
            endText="The default surface."
            value="outlined"
          >
            Outlined
          </Switch>
          <Switch
            card
            endText="A tinted surface."
            value="tonal"
            variant="tonal"
          >
            Tonal
          </Switch>
          <Switch
            card
            endText="A raised surface."
            value="elevated"
            variant="elevated"
          >
            Elevated
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
