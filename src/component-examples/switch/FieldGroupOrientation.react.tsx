import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Show in sidebar</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Switch name="switch-group-orientation" value="calendar">
            Calendar
          </Switch>
          <Switch name="switch-group-orientation" value="files">
            Files
          </Switch>
          <Switch name="switch-group-orientation" value="tasks">
            Tasks
          </Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
