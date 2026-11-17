import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Show in sidebar</FieldLegend>
        <FieldGroup name="switch-group-orientation" orientation="horizontal">
          <Switch value="calendar">Calendar</Switch>
          <Switch value="files">Files</Switch>
          <Switch value="tasks">Tasks</Switch>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
