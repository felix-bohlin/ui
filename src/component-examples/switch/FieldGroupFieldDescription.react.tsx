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
      <Fieldset>
        <FieldLegend>Email me about</FieldLegend>
        <FieldDescription>We send at most one email a week.</FieldDescription>
        <FieldGroup
          name="switch-group-field-description-1"
          orientation="horizontal"
        >
          <Switch value="news">Product news</Switch>
          <Switch value="tips">Tips</Switch>
          <Switch value="offers">Offers</Switch>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Accessibility</FieldLegend>
        <FieldGroup
          name="switch-group-field-description-2"
          orientation="horizontal"
        >
          <Switch value="reduce-motion">Reduce motion</Switch>
          <Switch value="high-contrast">High contrast</Switch>
          <Switch value="captions">Captions</Switch>
        </FieldGroup>
        <FieldDescription>These apply on this device only.</FieldDescription>
      </Fieldset>
    </Form>
  )
}
