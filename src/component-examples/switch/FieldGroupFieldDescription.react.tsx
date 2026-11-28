import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Switch,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <Fieldset aria-describedby="switch-field-group-field-description-1-description">
        <FieldLegend>Email me about</FieldLegend>
        <FieldDescription id="switch-field-group-field-description-1-description">
          We send at most one email a week.
        </FieldDescription>
        <FieldGroup orientation="horizontal">
          <Switch name="switch-group-field-description-1" value="news">
            Product news
          </Switch>
          <Switch name="switch-group-field-description-1" value="tips">
            Tips
          </Switch>
          <Switch name="switch-group-field-description-1" value="offers">
            Offers
          </Switch>
        </FieldGroup>
      </Fieldset>
      <Fieldset aria-describedby="switch-field-group-field-description-2-description">
        <FieldLegend>Accessibility</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Switch name="switch-group-field-description-2" value="reduce-motion">
            Reduce motion
          </Switch>
          <Switch name="switch-group-field-description-2" value="high-contrast">
            High contrast
          </Switch>
          <Switch name="switch-group-field-description-2" value="captions">
            Captions
          </Switch>
        </FieldGroup>
        <FieldDescription id="switch-field-group-field-description-2-description">
          These apply on this device only.
        </FieldDescription>
      </Fieldset>
    </Form>
  )
}
