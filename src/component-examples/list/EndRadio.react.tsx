import { List, ListItem, RadioInput } from "opui-css/react"

export default function EndRadio() {
  return (
    <List>
      <ListItem
        end={<RadioInput name="radio-example-group" value="1" />}
        label="Radio 1"
        type="radio"
      />
      <ListItem
        end={<RadioInput name="radio-example-group" value="2" />}
        label="Radio 2"
        type="radio"
      />
    </List>
  )
}
