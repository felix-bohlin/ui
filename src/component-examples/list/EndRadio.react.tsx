import {
  FieldGroup,
  FieldLegend,
  Fieldset,
  List,
  ListItem,
  RadioInput,
} from "opui-css/react"

export default function EndRadio() {
  return (
    <Fieldset>
      <FieldLegend>Theme</FieldLegend>
      <FieldGroup>
        <List>
          <ListItem
            choice="radio"
            end={<RadioInput name="theme" value="dark" />}
            label="Dark mode"
          />
          <ListItem
            choice="radio"
            end={<RadioInput name="theme" value="light" />}
            label="Light mode"
          />
        </List>
      </FieldGroup>
    </Fieldset>
  )
}
