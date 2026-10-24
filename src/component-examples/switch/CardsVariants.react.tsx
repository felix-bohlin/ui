import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"

export default function CardsVariants() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Variants</FieldLegend>
        <FieldGroup name="switch-cards-variants" orientation="horizontal">
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
    </Form>
  )
}
