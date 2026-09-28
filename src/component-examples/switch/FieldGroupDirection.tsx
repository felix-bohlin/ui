import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="switch-group-direction-astro">
          <Switch>Switch 1</Switch>
          <Switch>Switch 2</Switch>
          <Switch>Switch 3</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
