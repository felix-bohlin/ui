import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsMatrix() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Input at the end</FieldLegend>
        <FieldGroup name="switch-cards-end" orientation="horizontal">
          <Switch
            value="outlined"
            defaultChecked
            card
            spread
            endText="The default surface."
          >
            Outlined
          </Switch>
          <Switch
            value="tonal"
            card
            variant="tonal"
            spread
            endText="A tinted surface."
          >
            Tonal
          </Switch>
          <Switch
            value="elevated"
            card
            variant="elevated"
            spread
            endText="A raised surface."
          >
            Elevated
          </Switch>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Input at the start</FieldLegend>
        <FieldGroup name="switch-cards-start" orientation="horizontal">
          <Switch
            value="outlined"
            defaultChecked
            card
            endText="The default surface."
          >
            Outlined
          </Switch>
          <Switch
            value="tonal"
            card
            variant="tonal"
            endText="A tinted surface."
          >
            Tonal
          </Switch>
          <Switch
            value="elevated"
            card
            variant="elevated"
            endText="A raised surface."
          >
            Elevated
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
